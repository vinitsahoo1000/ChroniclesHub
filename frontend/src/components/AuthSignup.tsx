import { Button } from "./Button"
import { Heading } from "./Heading"
import { InputBox } from "./InputBox"
import { PasswordBox } from "./PasswordBox"
import { SubHeading } from "./SubHeading"


export const AuthSignup = () => {
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
                        <InputBox label="Full Name" placeholder="Full Name"/>
                        <InputBox label="Username" placeholder="Username"/>
                        <InputBox label="Email" placeholder="Email"/>
                        <PasswordBox label="Password"/>
                    </div>
                    <div className="mt-6">
                        <Button label="Sign Up"/>
                    </div>
                </div>
            </div>
        </div>
    )
}