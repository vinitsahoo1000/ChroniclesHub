import { Mail, Edit3 } from "lucide-react";
import {User} from "../context/UserContext";

export const ProfileCard = ({ user }: { user: User }) => {
    return (
        <div className="bg-white shadow-lg border rounded-xl w-96 h-auto mx-auto mt-10">
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
                <span className="font-semibold text-black ml-14">{user.following.length}</span>
                <span className="font-semibold text-black ml-3">{user.follower.length}</span>
                <span className="font-semibold text-black mr-11">{user.blog?.length}</span>
            </div>
        </div>
        <div className="mt-6 flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300">
                Edit Profile
            </button>
        </div>
        </div>
    </div>
    );
};
