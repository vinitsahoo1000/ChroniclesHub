import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useFetchAllBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useFetchAllBlogs();

    
    if(loading){
        return(
            <div>
                Loading.....
            </div>
        )
    }

    return (
        <div>
            <div className="pb-4">
                <Appbar/>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
                <BlogCard 
                    key={blog.id} 
                    title={blog.title} 
                    content={blog.content} 
                    date={(blog.createdAt).split('T')[0]} 
                    author={blog.author.name} 
                    profile={blog.author.profileUrl}
                    likes={blog.likes.length}
                    comments={blog.comments.length}
                />
            ))}
        </div>
        </div>
    )
}
