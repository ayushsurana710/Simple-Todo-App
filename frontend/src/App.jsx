import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(()=>{
      fetch("http://localhost:3000/todos")
      .then(async function(res){
        const json = await res.json();
        setTodos(json.todos);
      })
    },10000)
  },[])

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  )
}

export default App
