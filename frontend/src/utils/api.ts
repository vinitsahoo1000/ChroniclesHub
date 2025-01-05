import axios from "axios";
import { Backend_URL } from "../config";

const getToken = (): string|null => localStorage.getItem("token");


export const fetchUserData = async() =>{
    try{
        const token = getToken();

        if(!token){
            console.log("User not logged in")
            return null;
        }

        const response = await axios.get(`${Backend_URL}/user/details`,{
            headers:{
                Authorization: token
            }
        })

        if(response.data.user){
            return response.data.user
        }
        else{
            console.error("Invalid response from server!!")
        }

    }catch(error){


    }
}