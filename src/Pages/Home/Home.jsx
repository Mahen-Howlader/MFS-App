import { Outlet } from "react-router-dom";
import Login from "../../Component/Login/Login";
import Register from "../../Component/Register/Register";
import Paymentpage from "../../Component/Register/Register";
import Navbar from "../Shered/Navbar";

function Home() {
    return (
        <div className="">
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            {/* <Register></Register> */}
            {/* <Login></Login> */}
        </div>
    );
}

export default Home;