import { useContext, useEffect, useState } from "react";
import { followAuthor, unfollowAuthor } from "../api/api";
import { BlogInterface } from "../hooks"
import { UserContext } from "../context/UserContext";


interface AuthorProfileCardProps {
    blog: BlogInterface;
}

export const AuthorProfileCard = ({ blog }: AuthorProfileCardProps) =>{
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const [followed,setFollowed] = useState(false);


    useEffect(()=>{
        const isFollowing = user?.follower?.some((f: { following_id: string }) => f.following_id === blog?.author?.id) ?? false
        setFollowed(isFollowing);
    },[user?.follower.length,blog.author.id])
    
    
    const handleFollow = async() =>{
        try{
            if(!followed){
                const response = await followAuthor(blog.author.id);
                if(response.status === 200){
                    setFollowed(true);
                }
            }
            else{
                const response = await unfollowAuthor(blog.author.id);
                if(response.status === 200){
                    setFollowed(false);
                }
            }
        }catch(error){
            console.error("Failed to follow the author:", error);
        }
    }

    return(
        <div className="flex items-center space-x-4">
                            <img src={blog.author.imageUrl} className="w-12 h-12 rounded-full shadow-lg" alt={blog.author.name} />
                            <div className="flex flex-col">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-gray-800">{blog.author.name}</span>
                                    <button onClick={handleFollow} className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                                        {followed ?"following":"follow"}
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">Published on {(blog.createdAt).split('T')[0]}</span>
                            </div>
                        </div>
    )
}