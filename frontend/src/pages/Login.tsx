import { BottomAuthPrompt } from "../components/BottomAuthPrompt"


export const Login = () => {
    return(
        <div>
            Login Page
            <div>
                <BottomAuthPrompt isSignup={false}/>
            </div>
        </div>
    )
}