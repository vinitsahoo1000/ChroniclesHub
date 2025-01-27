import { ChangeEvent, useState } from "react";
import { Backend_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";


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
            <div className="p-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
            </label>
            <textarea id="title" onChange={(e) =>setTitle(e.target.value)} className="block w-full mt-1 px-3 py-2 text-sm border rounded-md" placeholder="Write your title here..." required/>
            </div>
            <form className="w-full p-2 mt-5">
            <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-900">Content</label>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
            <input
                type="file"
                className="hidden"
                id="fileInput"
                onChange={handleFileChange}
            />
                <button
                    type="button"
                    className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => document.getElementById("fileInput")?.click()}
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                        />
                    </svg>
                    <span className="sr-only">Attach file</span>
                </button>
                {file && (
                    <span className="text-sm text-gray-600 truncate max-w-xs">
                        {file.name}
                    </span>
                )}
                </div>
                    </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg">
                    <textarea
                        id="editor"
                        rows={16}
                        onChange={(e) =>setContent(e.target.value)}
                        className="block w-full px-3 py-2 text-sm text-gray-800 bg-white border-0 focus:ring-0 resize-none"
                        placeholder="Write an article..."
                        required/>
                    </div>
                </div>
                <button
                type="button"
                    onClick={postBlog}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Post Blog
                </button>
        </form>
    </div>
    )
};