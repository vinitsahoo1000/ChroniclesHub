import { useNavigate } from "react-router-dom";

interface UserProfileBlogsProps {
    id?: string;
    title: string;
    content: string;
    publishedDate: string;
    isUser: boolean;
}


export const UserProfileBlogs = ({id, title, content, publishedDate,isUser}:UserProfileBlogsProps) => {
    const navigate = useNavigate();

    
    return(
        <div className="border p-4 m-4 rounded-lg shadow-lg">
            <button onClick={() => navigate(`/blog/editor/${id}`,{replace:true})}>
            {isUser &&
            (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>)
            }
            </button>
            <div onClick={() => navigate(`/blog/${id}`)} className="cursor-pointer">
            <div className="text-2xl font-semibold">
                {title}
            </div>
            <div className="flex flex-col items-center justify-center text-xl space-y-4">
                <div dangerouslySetInnerHTML={{ __html:`${content.substring(0,50)}...`}} />
            </div>
            <div>
                {publishedDate.split('T')[0]}
            </div>
            </div>
        </div>
    )
}