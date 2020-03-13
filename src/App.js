import React, { useState, useRef, useEffect } from 'react';
//useState is hook which allows functional components to keep track of their state even through renders
//useRef allows hooking into ref attribute to easy access elements in the dom
//useEffect runs function whenever a passed dependancy is altered in some fashion
import ToDoList from './ToDoList';

//Used for uuidv4() generates a unique id for 
import {v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //example of array destructuring where useState returns two variables, essestially create two new variables todos and setTodos, assigning the returned values respectivley
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //Only runs once on component creation because of empty array
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //Runs anytime todos array changes, saves todos to localstorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    //Spread syntax [...arr] to clone array differs from older arr.slice()
    //Copies array rather than assigning the reference to it
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  //Filters all complete todos and updates state
  function handleClearToDo(e){
      const newTodos = todos.filter(todo => !todo.complete)
      setTodos(newTodos)
  }


  function handleAddToDo(e){
      const name = todoNameRef.current.value
      if (name === '') return
      setTodos(prevTodos => {
        //Spread used again here but adding an additional item
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null
  }

  return (
    // <> empty tags are used because you can only return one item, so you can wrap other componnents together for render
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text'/>
      <button onClick={handleAddToDo}>Add Todo</button>
      <button onClick={handleClearToDo}>Clear completed todo</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
