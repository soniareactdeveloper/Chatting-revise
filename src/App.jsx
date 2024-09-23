import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import RegisterPage from './Pages/RegisterPage'
import ForgetPage from './Pages/ForgetPage'
import LogInPage from './Pages/LogInPage'

function App() {
  const route = createBrowserRouter (
    createRoutesFromElements (
      <Route>
        <Route path='/'              element={<LogInPage />}/>
        <Route path='/register'      element={<RegisterPage/>}/>
        <Route path='/forgot'        element={<ForgetPage/>}/>
      </Route>
    )
  )

  return (
    <>
     <RouterProvider router={route} />
    </>
  )
}

export default App
