import { useState, useContext, useEffect } from "react";
import { UserProfileBlogs } from "../components/UserProfileBlogs"
import { UserContext } from "../context/UserContext";
import { ProfileBlogSkeleton } from "../components/loading/ProfileBlogSkeleton";
import { Appbar } from "../components/Appbar";


export const UserBlogs = () =>{
    const [loading, setLoading] = useState(true);
    
        const userContext = useContext(UserContext); 
        const user = userContext?.user;
    
        useEffect(() => {
            if(user){
                setLoading(false);
            }
        }, [user]);
        
        if(loading){
            const skeletonCount = 5;

            return(
                <div>
                    <div className="p-10">
                        {Array.from({ length: skeletonCount }).map((_, index) => ( < ProfileBlogSkeleton key={index}/>))}
                    </div>
                </div>
            )
        }


    return(
        <div>
            <div>
                <Appbar/>
            </div>
            <div className="p-3">
                    {loading?<div> </div> :<div className="text-2xl font-bold text-gray-800 mb-4">Your Blogs:</div>}
                    <div className="overflow-y-scroll h-[calc(100vh-150px)]">
                        {user?.blog?.length? user?.blog?.map((singleBlog) => (
                                <UserProfileBlogs 
                                    key={singleBlog.id}
                                    isUser={true}
                                    id={singleBlog.id}
                                    title={singleBlog.title} 
                                    content={singleBlog.content} 
                                    publishedDate={singleBlog.createdAt} 
                                />
                        )):loading?<div> </div> :<div className="text-2xl font-semibold text-gray-800 mb-4">No Blogs Posted</div>}
                    </div>
        </div>
        </div>
    )
}