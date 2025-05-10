import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { AllBlogsSkeleton } from "../components/loading/AllBlogsSkeleton";
import { useFetchAllBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useFetchAllBlogs();

    
    if (loading) {
        const skeletonCount = 6;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: skeletonCount }).map((_, index) => ( < AllBlogsSkeleton key={index}/>))}
            </div>
        );
    }
    
    if(blogs.length === 0){
        return <div>
            <Appbar/>
            <span className="flex justify-center text-xl font-bold">No Blogs!!!, be the first to post a Blog</span>
        </div>
    }

    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <Appbar/>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
            {blogs.map((blog: any) => (
                <a href={`/blog/${blog.id}`} key={blog.id}>
                <BlogCard 
                    title={blog.title} 
                    content={blog.content} 
                    date={(blog.createdAt).split('T')[0]} 
                    author={blog.author.name} 
                    profile={blog.author.imageUrl}
                    likes={blog.likes.length}
                    comments={blog.comments.length}
                    />
                    </a>
            ))}
        </div>
        </div>
    )
}
