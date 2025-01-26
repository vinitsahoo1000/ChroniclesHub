import axios from "axios"
import { Backend_URL } from "../config"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const likeBlog = async (blogId:string)=>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.put(`${Backend_URL}/blog/${blogId}/like`,{},{
            headers:{
                Authorization: token
            }
        })
        if(response.status === 200){
            toast.success(response.data.message)
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