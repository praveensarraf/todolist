import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import EditTask from './components/tasks/EditTask';

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/register',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/task/:id',
      element: <EditTask/>
    }
  ]);

  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
