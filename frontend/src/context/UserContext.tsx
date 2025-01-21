import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Backend_URL } from "../config";

type Post ={
    id: string;
    title: string;
    content: string;
    publishedDate: string;
}

type User ={
    bio: string;
    id: string;
    name: string;
    email: string;
    username: string;
    imageUrl: string | null;
    posts: Post[] | null;
    liked: Post[] | null;
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
            setUser(response.data.user)
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