import { useParams } from "react-router-dom"
import { GetBlog } from "../components/GetBlog"
import { useFetchBlog } from "../hooks";
import { BlogSkeleton } from "../components/loading/BlogSkeleton";



export const BlogPost = ()=>{
    
    const {id} = useParams();
    const {loading,blog} = useFetchBlog({
        id: id || ""
    })

    if(loading){
        return(
            <BlogSkeleton/>
        )
    }

    if(Array.isArray(blog)){
        return(
            <div>
                {blog.map((singleBlog)=>{
                    return <GetBlog key={singleBlog.id} blog={singleBlog}/>
                })}
            </div>
        )
    }

    if(!blog){
        return(
            <div>
                <p>Blog not found</p>
            </div>
        )
    }

    return(
        <div>
            <GetBlog blog={blog}/>
        </div>
    )
}