import { useContext, useEffect, useState } from "react"
import { likeBlog, unlikeBlog } from "../api/api"
import { BlogInterface } from "../hooks"
import { Appbar } from "./Appbar"
import { UserContext } from "../context/UserContext"


export const GetBlog = ({blog}:{blog:BlogInterface}) =>{
    const [likes,setLikes] = useState(blog.likes.length);
    const [liked,setLiked] = useState(false);

    const userContext = useContext(UserContext); 
    const user = userContext?.user;

    useEffect(()=>{
        if(user?.liked?.map((post: { id: string }) => post.id).includes(blog.id)){
            setLiked(true)
        }
    },[user,blog.id])


    const handleLike = async()=>{
        try{
            if(!liked){
            const response = await likeBlog(blog.id);
                if(response?.status === 200){
                setLikes((prevLikes) => prevLikes+1);
                setLiked(true)
            }
            }
            else{
                const response = await unlikeBlog(blog.id);
                if(response?.status === 200){
                    setLikes((prevLikes) => prevLikes-1);
                    setLiked(false)
                }
            }
        }catch(error){
            console.error("Failed to like the blog:", error);
        }
    }


    return(
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="container mx-auto p-4">
            <div className="pt-4 text-3xl font-bold ">
                {blog.title}
            </div>
            <div className="flex justify-center pt-7">
                {blog.imageUrl?<img src={blog.imageUrl} className="w-1/2 max-w-xl rounded-lg shadow-lg" alt={blog.title}/>: <div></div>}
            </div>
            <div className="text-xl text-center pt-7">
                <div className="prose prose-lg max-w-none whitespace-pre-wrap font-semibold text-slate-500">
                {blog.content}
                </div>
            </div>
            <div className="flex items-center mt-8">
                <div className="flex items-center space-x-4">
                    <img src={blog.author.imageUrl} className="w-12 h-12 rounded-full shadow-lg" alt={blog.author.name} />
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-800">{blog.author.name}</span>
                            <button className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                                Follow
                            </button>
                        </div>
                        <span className="text-sm text-gray-500">Published on {(blog.createdAt).split('T')[0]}</span>
                    </div>
                </div>
            </div>
            <div className="mt-10 ml-5 flex ">
            <button onClick={handleLike} className={`py-1.5 px-3 ${liked?'text-green-600':"text-gray-500"} hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2`}>
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round"strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
            </svg>
            <span>{likes}</span>
            </button>
            <button className="py-1.5 px-3 mx-4 hover:text-green-600 hover:scale-105 hover:shadow text-center border border-gray-300 rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span>{blog.comments.length}</span>
            </button>
            </div>
            </div>
        </div>
    )
}