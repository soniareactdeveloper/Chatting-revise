import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import RegisterPage from './Pages/RegisterPage'
import ForgetPage from './Pages/ForgetPage'
import LogInPage from './Pages/LogInPage'
import { database } from './firebase.Config'
import LayoutOne from './Layout/LayoutOne'
import HomePage from './Pages/HomePage'
import UserCard from './Components/UserCard/UserCard'
import Friends from './Components/Friends/Friends'
import FriendRequest from './Components/FriendRequest/FriendRequest'
import Notification from './Components/Notification/Notification'
import Block from './Components/Block/Block'



function App() {
  const route = createBrowserRouter (
    createRoutesFromElements (
      <Route>
        <Route path='/login'              element={<LogInPage />}/>
        <Route path='/register'           element={<RegisterPage/>}/>
        <Route path='/forgot'             element={<ForgetPage/>}/>
        <Route path='/'                   element={<LayoutOne/>}>
          <Route index                  element={<HomePage/>}/>
          <Route path='/user'           element={<UserCard/>}/>
          <Route path='/friends'        element={<Friends/>}/>
          <Route path='/friend-request'  element={<FriendRequest/>}/>
          <Route path='/notifications'  element={<Notification/>}/>
          <Route path='/block'          element={<Block/>}/>
        </Route>
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
