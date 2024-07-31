import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Register from "../Component/Register/Register";
import Login from "../Component/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";

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

           },
           {
             path : "/dashboard",
             element : <Dashboard></Dashboard>

           }
        ]
    },
]);

export default router;