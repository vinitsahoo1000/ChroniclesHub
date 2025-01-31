import { Appbar } from "../components/Appbar"
import { GetAuthorProfile } from "../components/GetAuthorProfile"


export const AuthorProfile = () => {
    return(
        <div>
            <Appbar/>
                <div>
                    <GetAuthorProfile/>
                </div>
        </div>
    )
}