import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Button } from "./common/Button"
import { Heading } from "./common/Heading"
import { InputBox } from "./common/InputBox"
import { PasswordBox } from "./common/PasswordBox"
import { updatePassword, updateProfilePhoto, updateUser, UserUpdate } from "../api/api"
import ProfileEditorSkeleton from "./loading/ProfileEditorSkeleton"
import { toast } from "react-toastify"



export const ProfileEditor = () => {
    const userContext = useContext(UserContext);
    const Currentuser = userContext?.user;
    const [isLoading, setIsLoading] = useState(true);
    const [password,setPassword] = useState("");
    const [user, setUser] = useState<UserUpdate | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (Currentuser) {
            setUser({
                name: Currentuser.name,
                username: Currentuser.username,
                email: Currentuser.email,
                bio: Currentuser.bio
            });
            setIsLoading(false); // Data loaded
        }
    }, [Currentuser]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,value} = e.target;

        setUser((prevUser) =>{
            if(!prevUser) return null;
            
            return{
                ...prevUser,
                [name]: value
            };
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setSelectedFile(file);
        }
    };

    const updateUserProfile = async () => {
        if (!Currentuser) {
            toast.error("User data is missing.");
            return;
        }
    
        // Update user profile if user data has changed
        if (user) {
            await updateUser({ user, Currentuser });
        }
    
        // Update password if a new password is entered
        if (password) {
            const response = await updatePassword(password);
            if(response){
                setPassword("");
            }
        }
        
        if(selectedFile){
            const response = await updateProfilePhoto(selectedFile);
            if(response){
                setSelectedFile(null);
            }
        }
    };
    
    

    if(isLoading){
        return(
            <ProfileEditorSkeleton/>
        )
    }

    return (
        <div className="flex justify-center items-center min-h-screen from-purple-100 to-blue-100 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
                <div className="text-center">
                    <Heading label="Edit Your Profile" />
                </div>
                <div className="flex justify-center py-6">
                    <img 
                        src={`${Currentuser?.imageUrl}` ||"https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"} 
                        className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-md"
                    />
                </div>
                <div className="flex justify-center">
                <label className="cursor-pointer bg-blue-500 text-white px-2 py-1 mt-1 rounded-lg hover:bg-blue-600">
                Choose File
                    <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    />
                </label>
                <span className="pt-2 pl-1">{selectedFile ? selectedFile.name : "No file chosen"}</span>
                </div>
                <div className="space-y-4">
                    <InputBox name="name" onChange={handleChange} label="Name" placeholder="Enter your name" value={user?.name} />
                    <InputBox name="username" onChange={handleChange} label="Username" placeholder="Enter your username" value={user?.username}  />
                    <InputBox name="email" onChange={handleChange} label="Email" placeholder="Enter your email" value={user?.email}  />
                    <PasswordBox value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="bio" className="block text-sm ml-2 font-medium text-gray-700">Bio</label>
                    <textarea 
                        id="bio" 
                        rows={4} 
                        name="bio"
                        value={user?.bio || ""}
                        onChange={handleChange}
                        className="block w-72 p-3 ml-2 text-sm text-gray-900 bg-purple-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 resize-none"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                </div>
                <div className="flex justify-center mt-6">
                    <Button label="Update Profile" onClick={updateUserProfile}/>
                </div>
            </div>
        </div>
    );
}
