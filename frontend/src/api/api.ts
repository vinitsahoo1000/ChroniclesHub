import axios from "axios"
import { Backend_URL } from "../config"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from "../context/UserContext";


export interface UserUpdate {
    name?: string;
    email?: string;
    username?: string;
    bio?: string;
}

export interface BlogEditProps {
    title?: string;
    content?: string;
    image?: File | null
}

export const likeBlog = async (blogId:string)=>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.put(`${Backend_URL}/blog/${blogId}/like`,{},{
            headers:{
                Authorization: token
            }
        })
        if(response.status === 200){
            toast.success(response.data.msg)
            return response;
        }
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}


export const unlikeBlog = async (blogId:string)=>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.put(`${Backend_URL}/blog/${blogId}/unlike`,{},{
            headers:{
                Authorization: token
            }
        })
        if(response.status === 200){
            toast.success(response.data.msg)
            return response;
        }
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}

export const deleteComment = async(blogId:string,commentId:string) => {
    const token = localStorage.getItem("token");

    try{
        const response = await axios.delete(`${Backend_URL}/blog/${blogId}/comment/${commentId}`,{
            headers:{
                Authorization: token
            }
        })

        if(response.status === 200){
            toast.success(response.data.message)
        }
        return response
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}


export const followAuthor = async(userId:string) =>{
    const token = localStorage.getItem("token");

    try{
        const response = await axios.put(`${Backend_URL}/user/follow/${userId}`,null,{
            headers:{
                Authorization: token
            }
        })
        if(response.status === 200){
            toast.success(response.data.msg)
        }
        return response;
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}


export const unfollowAuthor = async(userId:string) =>{
    const token = localStorage.getItem("token");

    try{
        const response = await axios.put(`${Backend_URL}/user/unfollow/${userId}`,null,{
            headers: {
                Authorization: token
            }
        })
        if(response.status === 200){
            toast.info(response.data.msg)
        }
        return response;
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}


export const updateUser = async({user,Currentuser}:{Currentuser:User,user:UserUpdate})=>{
    if(!user) return;
    const token = localStorage.getItem("token")

    const updatedFields: Partial<UserUpdate> = {};

    Object.entries(user).forEach(([key, value]) => {
    if (value !== (Currentuser as any)[key]) {  // Compare with original user data
        updatedFields[key as keyof UserUpdate] = value;
    }
    });

    if (Object.keys(updatedFields).length === 0) {
        return;
    }

    try{
        const response = await axios.put(`${Backend_URL}/user/update`,updatedFields,{
            headers:{
                "Content-Type": "application/json",
                Authorization: token
            }
        })  
        if(response.status === 200){
            toast.success(response.data.message)
        }
        if(response.status === 400){
            toast.info(response.data.message)
        }
    }catch(error:any){
        if(error.response){
            toast.error(error.response.data.message)
        }
        else {
            toast.error("There was an error while login. Please try again later.");
        }
        throw error
    }
}


export const updatePassword = async (password: string) => {
    if (!password) return;
    const token = localStorage.getItem("token");

    try {
        const response = await axios.put(`${Backend_URL}/user/passwordUpdate`,
            { password },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }
        );

        if (response.status === 200) {
            toast.success("Password updated successfully");
        }
        if (response.status === 400) {
            toast.info(response.data.message);
        }
        return response;
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Error updating password");
    }
};


export const updateBlog = async ({blogEdit,id}:{blogEdit:BlogEditProps | FormData,id:string}) =>{
    if(!blogEdit) return;

    const token = localStorage.getItem("token");

    try{
        let response;

        if (blogEdit instanceof FormData) {
            // Use multipart/form-data when sending a file
            response = await axios.put(`${Backend_URL}/blog/update/${id}`, blogEdit, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            // Send JSON data when no file is attached
            response = await axios.put(`${Backend_URL}/blog/update/${id}`, blogEdit, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
        }
        if (response.status === 200) {
            toast.success(response.data.msg);
        } else {
            toast.error(response.data.message);
        }
        return response;
    }catch(error: any){
        toast.error(error.response?.data?.message || "Error updating blog");
    }
}