import { ChangeEvent, useState } from "react";
import { Backend_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import { TitleInputBox } from "./common/TitleInputBox";
import { ContentTextArea } from "./common/ContentTextArea";
import { Button } from "./common/Button";


export const BlogPostEditor = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [file,setFile] = useState<File | null>(null)

    function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
        const file = e.target.files?.[0];
        if(file){
            setFile(file);
            console.log(file.name);
        }
        else{
            setFile(null);
        }
    }

    const postBlog = async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        if(!title || !content){
            toast.error("Title and content are required");
            return;
        }

        const formData = new FormData();
        formData.append("title",title);
        formData.append("content",content);
        if (file) {
            formData.append("image", file);
        }

        const token = localStorage.getItem("token");

        try{
            const response = await axios.post(`${Backend_URL}/blog/post`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                },
            })
            if(response.status === 200){
                toast.success(response.data.msg);
                setTimeout(() => {
                    window.location.href = `/blog/${response.data.blog.id}`;
                }, 3000);
            }
        }
        catch(error:any){
            toast.error(error.response.data.message);
        }
    }


    return(
        <div>
            <div>
                <TitleInputBox name={"title"} onChange={(e) => {setTitle(e.target.value)}}/>
            </div>
            <div>
                <ContentTextArea onChange={(e) => {setContent(e.target.value)}} handleFileChange={handleFileChange} file={file}/>
            </div>
            <div className="pl-2">
                <Button onClick={postBlog} label={"Post Blog"} />
            </div>
    </div>
    )
};