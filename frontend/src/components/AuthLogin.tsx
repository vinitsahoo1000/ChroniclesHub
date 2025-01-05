import { useState } from "react"
import { BottomAuthPrompt } from "./BottomAuthPrompt"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { PasswordBox } from "./PasswordBox"
import { SubHeading } from "./SubHeading"
import axios from "axios"
import { Backend_URL } from "../config"


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
                alert(response.data.msg)
                localStorage.setItem("token",`Bearer ${response.data.token}`)
                window.location.href = "/blogs";
                return;
            }
        }catch(error:any){
            if(error.response){
                alert(error.response.data.message)
            }
            else {
                alert("There was an error while login. Please try again later.");
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