import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";


interface CommentBoxProps {
    blogId: string;
    authorId: string;
    fetchComments: () => void;
}


export const CommentBox = ({blogId,authorId,fetchComments}:CommentBoxProps)=>{
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    
    const Backend_URL = import.meta.env.VITE_BACKEND_URL; 

    const postComment = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        setLoading(true);

        try{
            const response = await axios.post(`${Backend_URL}/blog/${blogId}/comment`,{
                content: content,
                blogId: blogId,
                authorId: authorId
            },{
                headers:{
                    Authorization: token
                }
            })
            if(response.status === 200){
                toast.success(response.data.message);
                console.log(response.data.message)
                setContent("");
                fetchComments();
                setLoading(false);
            }
        }catch(error:any){
            const message = error.response.data.message || "Failed to post the comment.";
            toast.error(message)
            console.error("Failed to post the comment:", error);
            setLoading(false)
        }
    }

    return(
        <div>
            <form className="w-full bg-gray-100  p-2 mt-20">
                <div className="px-3 mb-2 mt-2">
                <textarea placeholder="comment.." value={content} onChange={(e) => {setContent(e.target.value)}} className="w-full bg-gray-100 rounded  shadow-lg border-black leading-normal resize-none  py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
                </div>
                <div className="flex justify-end px-4">
                <button disabled={loading} className="px-2.5 py-1.5 rounded-md text-white text-sm bg-slate-500" onClick={postComment}>{loading?"Posting...":"Comment"}</button>
                </div>
            </form>
        </div>
    )
}