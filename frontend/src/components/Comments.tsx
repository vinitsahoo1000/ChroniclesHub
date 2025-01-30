import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { DropDownMenu } from "./DropdownMenu"

interface CommentsProps {
    id: string;
    blogId: string;
    content: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
        username: string;
        imageUrl?: string;
    };
    fetchComments: () => void; // Prop to refresh comments
}


export const Comments = ({id ,content, createdAt, author,fetchComments}:CommentsProps)=>{

    const userContext = useContext(UserContext); 
        const user = userContext?.user;
    return(
        <div className="w-full">
            <article className="p-6 text-base bg-gray-100 rounded-lg">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <a href={`/author/profile/${author.username}`}>
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                            <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={
                                    author.imageUrl ||
                                    "https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"
                                }
                                alt="Author profile"
                                />
                            {author.name}
                        </p>
                        </a>
                        <p className="text-sm text-gray-600">
                            <time dateTime={createdAt}>{createdAt.split("T")[0]}</time>
                        </p>
                        <div>
                            {(user?.id === author.id)?<DropDownMenu fetchComments={fetchComments} commentId={id}/>: <div></div>}
                        </div>
                    </div>
                </footer>
                <p className="text-gray-500">{content}</p>
            </article>
        </div>
    )
}