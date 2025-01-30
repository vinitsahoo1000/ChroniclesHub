import { Appbar } from "../components/Appbar"
import { ProfileEditor } from "../components/ProfileEditor"


export const EditProfile = () =>{
    return(
        <div>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Appbar/>
            </div>
            <div className="flex flex-row justify-center mt-20">
                <ProfileEditor/>
            </div>
        </div>
    )
}