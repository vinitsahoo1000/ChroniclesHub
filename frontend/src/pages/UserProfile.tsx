import { useContext, useEffect, useState } from "react";
import { ProfileCard } from "../components/ProfileCard"
import { UserContext } from "../context/UserContext";
import { Appbar } from "../components/Appbar";
import { UserProfileBlogs } from "../components/UserProfileBlogs";


export const UserProfile = () => {
    const [loading, setLoading] = useState(true);

    const userContext = useContext(UserContext); 
    const user = userContext?.user;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); 
        return () => clearTimeout(timer);
    }, []);

    return(
        <div className="overflow-hidden h-screen">
            <Appbar/>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
        <div className="flex flex-row justify-center pt-8">
            {user && <ProfileCard user={user} />}
        </div>
        <div className="p-10">
        {loading?<div className="animate-pulse"> </div> :<div className="text-2xl font-bold text-gray-800 mb-4">Blogs:</div>}
        <div className="overflow-y-scroll h-[calc(100vh-150px)]">
            {user?.blog?.map((singleBlog) => (
                <a href={`/blog/${singleBlog.id}`} key={singleBlog.id}>
                    <UserProfileBlogs 
                        title={singleBlog.title} 
                        content={singleBlog.content} 
                        publishedDate={singleBlog.createdAt} 
                    />
                </a>
            ))}
        </div>
        </div>
        </div>
        </div>
    )
}