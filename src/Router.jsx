import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home";
import AddUser from "./Component/AddUser";
import UserDetails from "./Component/UserDetails";
import UpdateUser from "./Component/UpdateUser";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:3000/users'),
                element: <Home></Home>
            },
            {
                path: 'add-user',
                element:<AddUser></AddUser>
            },
            {
                path: 'user-detail/:id',
                loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
                element: <UserDetails></UserDetails>
            },
            {
                path: 'update-user/:id',
                loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
                element: <UpdateUser></UpdateUser>
            }
        ]
    }
])