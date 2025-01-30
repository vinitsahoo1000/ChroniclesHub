import { Appbar } from "../components/Appbar"
import { GetAuthorProfile } from "../components/GetAuthorProfile"


export const AuthorProfile = () => {
    return(
        <div className="overflow-hidden h-screen">
            <Appbar/>
                <div>
                    <GetAuthorProfile/>
                </div>
        </div>
    )
}