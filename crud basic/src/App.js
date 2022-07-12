import React, { useState } from 'react'
import { useEffect } from 'react'
// import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedtodos = JSON.parse(temp);
    if (loadedtodos) {
      setTodos(loadedtodos);
    }

  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }
  const deleteTodo = (id) => {
    const updatetodo = todos.filter(todo => todo.id !== id);
    setTodos(updatetodo);
  }
  const toggletodo = (id) => {
    const updatetodo = [...todos].map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }
    );
    setTodos(updatetodo);
  }
  const editTodo = (id) => {
    const updatetodo = [...todos].map(todo => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;

    })
    setTodos(updatetodo);
    setTodoEditing(null);
    setEditingText("");
  }
  return (
    <div className='App' style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <input type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo} />
        <button
          type="submit">
          Add Todo</button>
      </form>
      {todos.map((todo) => (<div key={todo.id}>

        {todoEditing === todo.id ?
          (<input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
            value={editingText} />
          ) :
          (<h3> {todo.text}</h3>)}


        <button onClick={() => deleteTodo(todo.id)}> Delete </button>

        <input
          type="checkbox"
          onChange={() => toggletodo(todo.id)}
          checked={todo.completed} />

        {todoEditing === todo.id ?
          (<button onClick={() => editTodo(todo.id)}>Submit Edits</button>) :
          (<button onClick={() => setTodoEditing(todo.id)}> Edit todo </button>)}
      </div>))}
    </div>
  )
}

export default App