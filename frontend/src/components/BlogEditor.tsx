import { useParams } from "react-router-dom"
import { useFetchBlog } from "../hooks"
import { TitleInputBox } from "./common/TitleInputBox"
import { ContentTextArea } from "./common/ContentTextArea";
import { BlogEditorSkeleton } from "./loading/BlogEditorSkeleton";
import { Button } from "./common/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { BlogEditProps, updateBlog } from "../api/api";
import { toast } from "react-toastify";



export const BlogEditor = () => {
    const {id} = useParams();
    const [file,setFile] = useState<File | null>(null)
    const {loading, blog} = useFetchBlog({
        id: id || ""
    })
    const [blogEdit,setblogEdit] = useState<BlogEditProps| null>({
        title: "",
        content: ""
    })

    useEffect(()=>{
        setblogEdit({
            ...blogEdit,
            title: blog?.title || "",
            content: blog?.content || ""
        })
    },[blog])


    if(loading){
        return(
            <div>
                <BlogEditorSkeleton/>
            </div>
        )
    }

    if(!blog){
        return(
            <div>
                <p>Blog not found</p>
            </div>
            )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,value} = e.target;

        setblogEdit((prevUser) =>{
        if(!prevUser) return null;
            return{
                ...prevUser,
                [name]: value
            };
        })


    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setblogEdit((prev) => ({
            ...prev,
            image: selectedFile || prev?.image, // Set file in blogEdit state
        }));
        
    }


    const handleUpdate = async() =>{
        if(!blogEdit) return;

        if(!id){
            toast.error("Blog ID is missing");
            return;
        }

        let updateData: BlogEditProps | FormData;

        if (blogEdit.image) {
            updateData = new FormData();
            updateData.append("title", blogEdit.title || "");
            updateData.append("content", blogEdit.content || "");
            updateData.append("image", blogEdit.image);
        } else {
            // Otherwise, send JSON data
            updateData = { title: blogEdit.title, content: blogEdit.content };
        }

        const response = await updateBlog({ blogEdit:updateData, id });

        if(response){
            setTimeout(() =>{
                window.location.href = `/blog/${id}`
            },1500)
        }
    }


    return(
        <div className="p-2">
            <div>
                <TitleInputBox name={"title"} onChange={handleChange} value={blogEdit?.title}/> 
            </div>
            <div>
                <ContentTextArea name={"content"} onChange={handleChange} handleFileChange={handleFileChange} file={file || blogEdit?.image || null} value={blogEdit?.content}/>
            </div>
            <div className="pl-2">
                <Button onClick={handleUpdate} label="Update Blog"/>
            </div>
        </div>
    )
}
