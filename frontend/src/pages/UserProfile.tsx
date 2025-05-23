import { useContext, useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard"
import { UserContext } from "../context/UserContext";
import { Appbar } from "../components/Appbar";
import { UserProfileBlogs } from "../components/UserProfileBlogs";
import { ProfileBlogSkeleton } from "../components/loading/ProfileBlogSkeleton";
import { ProfileCardSkeleton } from "../components/loading/ProfileCardSkeleton";


export const UserProfile = () => {
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                        <ProfileCardSkeleton/>
                        <div className="p-10 hidden md:block">
                        {Array.from({ length: skeletonCount }).map((_, index) => ( < ProfileBlogSkeleton key={index}/>))}
                        </div>
                    </div>
                </div>
            )
        }
    

    return(
        <div className="overflow-hidden h-screen">
            <Appbar/>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
        <div>
            {user && <ProfileCard user={user} isAuthor={false}/>}
        </div>
        <div className="p-10 hidden md:block">
        {loading?<div> </div> :<div className="text-2xl font-bold text-gray-800 mb-4">Blogs:</div>}
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
        </div>
    )
}