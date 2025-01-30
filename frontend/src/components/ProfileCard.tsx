import { Mail, Edit3 } from "lucide-react";
import {User, UserContext} from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { followAuthor, unfollowAuthor } from "../api/api";



export const ProfileCard = ({ user,isAuthor }: { user: User,isAuthor:boolean }) => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.user;

    const [followerCount, setFollowerCount] = useState(user.following.length);
    const [followed,setFollowed] = useState(false);

    useEffect(()=>{
            const isFollowing = currentUser?.follower?.some((f: { following_id: string }) => f.following_id === user?.id) ?? false
            setFollowed(isFollowing);
        },[currentUser?.follower.length])

    const handleFollow = async() =>{
            try{
                if(!followed){
                    const response = await followAuthor(user.id);
                    if(response.status === 200){
                        setFollowed(true);
                        setFollowerCount((prev) => prev+1);
                    }
                }
                else{
                    const response = await unfollowAuthor(user.id);
                    if(response.status === 200){
                        setFollowed(false);
                        setFollowerCount((prev) => prev-1);
                    }
                }
            }catch(error){
                console.error("Failed to follow the author:", error);
            }
        }

    return (
        <div className="bg-white shadow-lg border rounded-xl w-96 pb-11 mx-auto mt-10">
        <div className="relative h-28 bg-gradient-to-r from-blue-500 to-purple-500">
        <img
            src={user.imageUrl || "https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"}
            alt={user.name}
            className="w-28 h-28 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-12 border-4 border-white"
        />
        </div>
        <div className="pt-16 px-4">
        <div className="text-center text-2xl font-semibold text-gray-800">@{user.username}</div>
        <div className="text-center text-lg font-medium text-gray-600">{user.name}</div>
        <div className="text-center text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
            <Edit3 size={16} />
            <span>{user.bio || "No bio available."}</span>
        </div>
        <div className="text-center text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>{user.email || "No email provided."}</span>
        </div>
        <div className="border-y border-solid border-black pb-4 mt-6">
            <div className="text-center text-sm text-gray-500 mt-4 w-full flex items-center justify-between gap-2">
                <span className="font-semibold text-black pl-8">Followers</span>
                <span className="font-semibold text-black">Following</span>
                <span className="font-semibold text-black pr-8">Posts</span>
            </div>
            <div className="text-center text-sm text-gray-500 mt-1 w-full flex items-center justify-between gap-2">
                <span className="font-semibold text-black ml-14">{followerCount}</span>
                <span className="font-semibold text-black ml-3">{user.follower.length}</span>
                <span className="font-semibold text-black mr-11">{user.blog?.length}</span>
            </div>
        </div>
        <div className="mt-6 flex justify-center">
            {isAuthor? <button onClick={handleFollow} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                {followed?"Following":"Follow"}
            </button>
            :<button onClick={() => {window.location.href = "/user/profileEditor"}} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                Edit Profile
            </button>}
        </div>
        </div>
    </div>
    );
};
