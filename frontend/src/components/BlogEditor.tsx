import { useParams } from "react-router-dom"
import { useFetchBlog } from "../hooks"
import { TitleInputBox } from "./common/TitleInputBox"
import { ContentTextArea } from "./common/ContentTextArea";
import { BlogEditorSkeleton } from "./loading/BlogEditorSkeleton";
import { Button } from "./common/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { BlogEditProps, deleteBlog, updateBlog } from "../api/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; 
import { ImageInput } from "./ImageInput";


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

    const handleContentChange = (value: string) => {
        setblogEdit((prev) => {
            if (!prev) return null;
            return {
            ...prev,
            content: value,
            };
        });
        };


    function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        console.log(file)
        setblogEdit((prev) => ({
            ...prev,
            image: selectedFile || prev?.image, 
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
            updateData = { title: blogEdit.title, content: blogEdit.content };
        }

        const response = await updateBlog({ blogEdit:updateData, id });

        if(response){
            setTimeout(() =>{
                window.location.href = `/blog/${id}`
            },1500)
        }
    }

    const handleDelete = async() =>{
        if(!id){
            toast.error("Blog ID is missing");
            return;
        }

        confirmAlert({
            title: "Confirm to delete",
            message: "Are you sure you want to delete this blog?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const response = await deleteBlog(id);
                        if (response) {
                            toast.success("Blog deleted successfully!");
                            setTimeout(() => {
                                window.location.href = `/user/profile`;
                            }, 1500);
                        }
                    }
                },
                {
                    label: "No"
                }
            ]
        });
    }

    return(
        <div className="p-2">
            <div>
                <TitleInputBox name={"title"} onChange={handleChange} value={blogEdit?.title}/> 
            </div>
            <div>
                <ImageInput onChange={handleFileChange}/>
            </div>
            <div>
                <ContentTextArea value={blogEdit?.content} setValue={handleContentChange}/>
            </div>
            <div className="pl-2 pr-2 flex justify-between pt-20">
                <Button onClick={handleUpdate} label="Update Blog"/>
                <button onClick={handleDelete} className="focus:outline-none text-white bg-red-700 hover:bg-red-800  focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                    Delete Blog
                </button>
            </div>
        </div>
    )
}
