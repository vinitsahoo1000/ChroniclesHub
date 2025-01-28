import { useParams } from "react-router-dom"
import { useFetchAuthor } from "../hooks"
import { ProfileCard } from "./ProfileCard"
import { UserProfileBlogs } from "./UserProfileBlogs";
import { ProfileCardSkeleton } from "./loading/ProfileCardSkeleton";
import { ProfileBlogSkeleton } from "./loading/ProfileBlogSkeleton";


export const GetAuthorProfile = () => {
    const {username} = useParams();
    const {author,loading} = useFetchAuthor({username:username || ""})

    if(loading){
        const skeletonCount = 5;

        return(
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                    <ProfileCardSkeleton/>
                    <div>
                    {Array.from({ length: skeletonCount }).map((_, index) => ( < ProfileBlogSkeleton key={index}/>))}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden">
                <div>
                {author && <ProfileCard user={author} isAuthor={true}/>}
                </div>
                <div className="p-10">
        {loading?<div> </div> :<div className="text-2xl font-bold text-gray-800 mb-4">Blogs:</div>}
        <div className="overflow-y-scroll h-[calc(100vh-150px)]">
            {author?.blog?.length? author?.blog?.map((singleBlog) => (
                <a href={`/blog/${singleBlog.id}`} key={singleBlog.id}>
                    <UserProfileBlogs 
                        title={singleBlog.title} 
                        content={singleBlog.content} 
                        publishedDate={singleBlog.createdAt} 
                    />
                </a>
            )):loading?<div> </div> :<div className="text-2xl font-semibold text-gray-800 mb-4">No Blogs Posted</div>}
        </div>
        </div>
        </div>
        </div>
    )
}