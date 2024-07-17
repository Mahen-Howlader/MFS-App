import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Register from "../Component/Register/Register";
import Login from "../Component/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children : [
           {
             path : "/register",
             element : <Register></Register>
             
           },
           {
             path : "/login",
             element : <Login></Login>

           }
        ]
    },
]);

export default router;