import { Appbar } from "../components/Appbar"
import { BlogPostEditor } from "../components/BlogPostEditor"

export const PostBlog = () => {
    return (
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="pt-5">
            <BlogPostEditor/>
            </div>
        </div>
    )
}