import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export const Appbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userContext = useContext(UserContext); 
    
    const user = userContext?.user;
    // Toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Logout function
    const Logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="bg-purple-500 p-4">
            {/* Top Bar */}
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <div className="text-white text-2xl font-bold">
                    ChroniclesHub
                </div>

                {/* Hamburger Menu Button (Visible on Mobile) */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden p-2 text-white"
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-7 h-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-6">
                    <a href="/blogs" className="text-white hover:text-gray-300">
                        Blogs
                    </a>
                    <a href="/user/profile" className="text-white hover:text-gray-300">
                        Profile
                    </a>
                    <a href="/post" className="text-white hover:text-gray-300">
                        Post
                    </a>
                    <div className="flex items-center space-x-3">
                        <a href="/user/profile">
                        <img
                            src={user?.imageUrl ||"https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        </a>
                        <button
                            onClick={Logout}
                            className="text-white hover:text-gray-300"
                            aria-label="Logout"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width="24"
                                height="24"
                                strokeWidth="2"
                            >
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                                <path d="M9 12h12l-3 -3"></path>
                                <path d="M18 15l3 -3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu (Visible on Mobile) */}
            {isMenuOpen && (
                <div className="lg:hidden bg-purple-600 rounded mt-4 p-4 shadow-lg text-white space-y-4">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-3">
                        <img
                            src={user?.imageUrl ||"https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <span className="text-lg font-medium">{user?.name || " "}</span>
                    </div>

                    {/* Menu Links */}
                    <a
                        href="/blogs"
                        className="block text-white hover:bg-purple-700 rounded p-2"
                    >
                        Blogs
                    </a>
                    <a
                        href="/user/profile"
                        className="block text-white hover:bg-purple-700 rounded p-2"
                    >
                        Profile
                    </a>
                    <a
                        href="/user/blogs"
                        className="block text-white hover:bg-purple-700 rounded p-2"
                    >
                        My Blogs
                    </a>
                    <a
                        href="/post"
                        className="block text-white hover:bg-purple-700 rounded p-2"
                    >
                        Post
                    </a>
                    <button
                        onClick={Logout}
                        className="block text-white hover:bg-purple-700 rounded p-2 w-full text-left"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
