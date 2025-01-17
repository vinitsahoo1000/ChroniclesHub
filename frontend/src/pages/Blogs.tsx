import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useFetchAllBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useFetchAllBlogs();

    
    if (loading) {
        const skeletonCount = 6;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: skeletonCount }).map((_, index) => (<div key={index} className="w-auto bg-white shadow-lg rounded-lg p-4 m-4 animate-pulse">
                    <div>
                        <div className="flex">
                            <div className="w-6 h-6 mt-1 rounded-full bg-gray-200"></div>
                            <div className="ml-2 mb-1 pt-1 text-sm w-3/4 bg-gray-200 h-4 rounded-full"></div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold p-2">
                        <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
                    </div>
                    <div className="text-lg p-2">
                        <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                    </div>
                    <div className="flex justify-between p-2">
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="flex">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
                        </div>
                        <div className="flex">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
                        </div>
                    </div>
                </div>))}
            </div>
        );
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
