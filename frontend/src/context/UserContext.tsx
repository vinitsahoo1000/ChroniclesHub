import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


const Backend_URL = import.meta.env.VITE_BACKEND_URL; 

export type Comments ={
    id: string;
    content: string;
    createdAt: string;
    author: User;
    blogId: string;
}

type Post ={
    id: string;
    title: string;
    content: string;
    createdAt: string;
    comments: Comments[] | null;
}

export interface Follower {
    follower_id: string;
    following_id: string;
    id: string;
}

export type User ={
    bio: string;
    id: string;
    name: string;
    email: string;
    username: string;
    imageUrl: string | null;
    blog: Post[] | null;
    liked: Post[] | null;
    follower: Follower[];
    following: Follower[];
}

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchUserData: () => Promise<void>;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider : React.FC<{children: React.ReactNode}> = ({children})=>{
    const [user,setUser] = useState<User | null>(null);
    
    const fetchUserData = async() =>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.get(`${Backend_URL}/user/details`,{
            headers:{
                Authorization: token
            }
        })

        if(response.data.user){
            setUser(response.data.user);
        }
        else{
            console.error("Invalid response from server!!");
            setUser(null);
        }
    }catch(error){
        console.error("Error fetching user data:", error);
        setUser(null);
    }
    };

    useEffect(() =>{
        fetchUserData();
    },[])

    return(
        <UserContext.Provider value={{user,setUser,fetchUserData}}>
            {children}
        </UserContext.Provider>
    )
}
