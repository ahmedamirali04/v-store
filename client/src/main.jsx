import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import Books from './components/common/Books.jsx'
import BookById from './components/common/BookById.jsx'
import SentRequests from './components/user/SentRequests.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'
import RecievedRequests from './components/admin/RecievedRequests.jsx'
import UpdateBook from './components/admin/UpdateBook.jsx'
import AddBook from './components/admin/AddBook.jsx'
import LoginContext from './contexts/loginContext.jsx'
import CollectBook from './components/admin/CollectBook.jsx'



const browserRouterObj=createBrowserRouter([
  {
    path:"",
    element:<RootLayout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signin",
        element:<Signin/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"user-profile/",
        element:<UserProfile/>,
        children:[
          {
            path:"",
            element:<Books/>
          },
          {
            path:"requests",
            element:<SentRequests/>
          }
        ]
      },
      {
        path:"admin-profile/",
        element:<AdminProfile/>,
        children:[
          {
            path:"",
            element:<Books/>
          },
          {
            path:"requests",
            element:<RecievedRequests/>
          },
          {
            path:"addBook",
            element:<AddBook/>
          },
          {
            path:"updateBook/:bookId",
            element:<UpdateBook/>
          },
          {
            path:"collect",
            element:<CollectBook/>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <LoginContext>
      <RouterProvider router={browserRouterObj}/>
    </LoginContext>,
)
