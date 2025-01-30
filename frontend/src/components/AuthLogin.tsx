import { useState } from "react"
import { BottomAuthPrompt } from "./common/BottomAuthPrompt"
import { Button } from "./common/Button"
import { Heading } from "./common/Heading"
import { InputBox } from "./common/InputBox"
import { PasswordBox } from "./common/PasswordBox"
import { SubHeading } from "./common/SubHeading"
import axios from "axios"
import { Backend_URL } from "../config"
import { toast } from "react-toastify"


export const AuthLogin = () =>{
    const [userInput,setUserInput] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async() =>{
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput);
        try{
            const response = await axios.post(`${Backend_URL}/user/login`,{
                [isEmail? "email":"username"]: userInput,
                password: password
            })
            if(response.status === 200){
                toast.success(response.data.msg)
                localStorage.setItem("token",`Bearer ${response.data.token}`)
                setTimeout(() => {
                    window.location.href = '/blogs';
                }, 2000);
                return;
            }
        }catch(error:any){
            if(error.response){
                toast.error(error.response.data.message)
            }
            else {
                toast.error("There was an error while login. Please try again later.");
            }
        }

    }


    return(
        <div className="flex flex-col items-center min-h-screen">
            <div className="p-5 w-full max-w-md mx-auto">
                <div className="mt-5 text-center">
                <Heading label={"Login"}/>
                </div>
                <div className="mt-2">
                    <SubHeading label="Enter your credentials to login."/>
                </div>
                <div className="mt-2 flex flex-col items-center">
                    <div>
                        <InputBox label="Username/Email" onChange={(e) => {setUserInput(e.target.value)}}/>
                        <PasswordBox onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <div className="mt-4">
                        <BottomAuthPrompt isSignup={false} />
                    </div>
                    <div className="mt-5">
                        <Button label={"Login"} onClick={handleLogin}/>
                    </div>
                </div>
            </div>
        </div>
    )
}