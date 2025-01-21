import axios from "axios"
import { Backend_URL } from "../config"


export const likeBlog = async (blogId:string)=>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.put(`${Backend_URL}/blog/${blogId}/like`,{},{
            headers:{
                Authorization: token
            }
        })
        if(response.status === 200){
            return response;
        }
    }catch(error:any){
        if(error.response){
            alert(error.response.data.message)
        }
        else {
            alert("There was an error while login. Please try again later.");
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
            return response;
        }
    }catch(error:any){
        if(error.response){
            alert(error.response.data.message)
        }
        else {
            alert("There was an error while login. Please try again later.");
        }
        throw error
    }
}