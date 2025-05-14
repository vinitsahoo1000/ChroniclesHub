import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TitleInputBox } from "./common/TitleInputBox";
import { ContentTextArea } from "./common/ContentTextArea";
import { Button } from "./common/Button";
import { ImageInput } from "./ImageInput";


export const BlogPostEditor = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [file,setFile] = useState<File | null>(null)

    const Backend_URL = import.meta.env.VITE_BACKEND_URL; 

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
                toast.success(response.data.message);
                setTimeout(() => {
                    window.location.href = `/blog/${response.data.blog.id}`;
                }, 3000);
            }
        }
        catch(error:any){
            toast.error(error.response.data.message);
        }
    }


    return (
    <div className="p-2 space-y-4">
        <div>
        <TitleInputBox name="title" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
            <ImageInput onChange={handleFileChange}/>
        </div>
        <div>
        <ContentTextArea value={content} setValue={setContent} />
        </div>

        <div className="pt-16">
        <Button onClick={postBlog} label="Post Blog" />
        </div>
    </div>
);

};