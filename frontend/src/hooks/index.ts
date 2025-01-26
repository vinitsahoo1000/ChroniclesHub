import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_URL } from "../config";


export interface BlogInterface {
    "title": string,
    "content": string,
    'id': string,
    "author":{
        "id":string,
        "name":string,
        "imageUrl": string
    }
    "createdAt": string,
    "imageUrl"?:string,
    "likes": Array<String>,
    "comments": [{
        content: string;
        createdAt: string;
        author: {
        name: string;
        imageUrl: string | null;
        };
    }],
    "publishedDate": string
}

export interface AllCommentsProps {
    id: string;
    content: string;
    createdAt: string;
    author:{
        id: string;
        name: string;
        username: string;
        imageUrl: string | null;
    }
}


export const useFetchBlog = ({id}:{id:string}) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<BlogInterface[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${Backend_URL}/blog/${id}`,{
            headers:{
                Authorization: token
            }
        })
        .then(response=>{
            setBlog(response.data);
            setLoading(false)
        })
    },[id])

    return{
        loading,
        blog
    }

}

export const useFetchAllBlogs = () => {
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<BlogInterface[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${Backend_URL}/blog/bulk`);
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return{
        loading,blogs
    }
};

export const useFetchAllComments = ({blogId}:{blogId:string}) => {
    const [loading,setLoading] = useState(true);
    const [comments,setComments] = useState<AllCommentsProps[]>([]);


        const fetchComments = async ()=>{
            try{
                const response = await axios.get(`${Backend_URL}/blog/${blogId}/comments`)
                if (response.status === 200 && response.data.length === 0) {
                    setComments([]);
                } else {
                    setComments(response.data);
                }
            }catch(error){
                console.log("Error fetching comments:", error);
                setComments([]);
            }finally {
                setLoading(false);
            }   
        }

        useEffect(() =>{
            fetchComments();
        },[blogId])

    return{
        loading,comments,fetchComments,
    }
}