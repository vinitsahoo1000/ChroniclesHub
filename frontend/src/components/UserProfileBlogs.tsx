interface UserProfileBlogsProps {
    title: string;
    content: string;
    publishedDate: string;
}


export const UserProfileBlogs = ({title,content,publishedDate}:UserProfileBlogsProps) => {
    return(
        <div className="border p-4 m-4 rounded-lg shadow-lg">
            <div className="text-2xl font-semibold">
                {title}
            </div>
            <div className="flex flex-col items-center justify-center text-xl space-y-4">
                {content.substring(0,80)}
            </div>
            <div>
                {publishedDate.split('T')[0]}
            </div>
        </div>
    )
}