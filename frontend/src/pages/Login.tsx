import { Navigate } from "react-router-dom";
import { AuthLogin } from "../components/AuthLogin";
import { Quote } from "../components/Quote";


export const Login = () => {
    const token = localStorage.getItem("token");

    // If user is already logged in, redirect to /blogs
    if (token) {
    return <Navigate to="/blogs" replace />;
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
            
            <div className="pt-44">
                <AuthLogin/>
            </div>
            <div>
                <Quote/>
            </div>
        </div>
    )
}