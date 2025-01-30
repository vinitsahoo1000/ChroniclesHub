import { Appbar } from "../components/Appbar"
import { BlogEditor } from "../components/BlogEditor"


export const EditBlog = () => {
    return(
        <div>
            <div>
                <Appbar/>
            </div>
            <div>
                <BlogEditor/>
            </div>
        </div>
    )
}