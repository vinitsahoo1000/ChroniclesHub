import { useState } from "react";
import { BottomAuthPrompt } from "./common/BottomAuthPrompt";
import { Button } from "./common/Button";
import { Heading } from "./common/Heading";
import { InputBox } from "./common/InputBox";
import { PasswordBox } from "./common/PasswordBox";
import { SubHeading } from "./common/SubHeading";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthSignup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Backend_URL = import.meta.env.VITE_BACKEND_URL; 

    const handleSignup = async () => {
        try {    
            const response = await axios.post(`${Backend_URL}/user/signup/`, {
                name,
                username,
                email,
                password
            });
            if(response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem("token",`Bearer ${response.data.token}`)
                window.location.href = "/blogs";
                return;
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("There was an error signing up. Please try again later.");
            }
        }
    }

    return(
        <div className="flex flex-col items-center min-h-screen">
            <div className="p-5 w-full max-w-md mx-auto">
                <div className="mt-5 text-center">
                    <Heading label="Sign Up"/>
                </div>
                <div className="mt-3 text-center">
                    <SubHeading label="Create your account" />
                </div>
                <div className="mt-2 flex flex-col items-center">
                    <div>
                        <InputBox label="Full Name" onChange={(e) => {setName(e.target.value)}} placeholder="Full Name"/>
                        <InputBox label="Username" onChange={(e) => {setUsername(e.target.value)}} placeholder="Username"/>
                        <InputBox label="Email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
                        <PasswordBox onChange={(e) =>{setPassword(e.target.value)}}/>
                    </div>
                    <div className="mt-4">
                        <BottomAuthPrompt isSignup={true}/>
                    </div>
                    <div className="mt-6">
                        <Button label="Sign Up" onClick={handleSignup}/>
                    </div>
                </div>
            </div>
        </div>
    )
}