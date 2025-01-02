import { AuthLogin } from "../components/AuthLogin";
import { Quote } from "../components/Quote";


export const Login = () => {
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