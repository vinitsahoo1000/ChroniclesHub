import { useParams } from "react-router-dom"
import { GetBlog } from "../components/GetBlog"
import { useFetchBlog } from "../hooks";



export const BlogPost = ()=>{
    
    const {id} = useParams();
    const {loading,blog} = useFetchBlog({
        id: id || ""
    })

    if(loading){
        return(
            <div>
                Loading....
            </div>
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

    return(
        <div>
            <GetBlog blog={blog}/>
        </div>
    )
}