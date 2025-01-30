import { Navigate } from "react-router-dom";
import { AuthSignup } from "../components/AuthSignup"
import { Quote } from "../components/Quote"


export const Signup = () => {
    const token = localStorage.getItem("token");

    // If user is already logged in, redirect to /blogs
    if (token) {
    return <Navigate to="/blogs" replace />;
    }
    return(
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                <div className="pt-24">
                    <AuthSignup/>
                </div>
                <div className="hidden lg:block">
                    <Quote/>
                </div>
            </div>
        </div>
    )
}