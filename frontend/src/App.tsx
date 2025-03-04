import './App.css'
import AboutPopup from './components/AboutPopup/AboutPopup'
import TodoList from './components/TodoList/TodoList'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <h1>Mini Aplicação Todo List</h1>
      <h2>API Laravel + MySQL + React</h2>
      <AboutPopup />
      <TodoList />
      <ToastContainer />
    </div>
  )
}

export default App
