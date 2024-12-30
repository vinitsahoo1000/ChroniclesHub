import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface PasswordBoxProps {
    label: string;
}

export const PasswordBox = ({label}:PasswordBoxProps) => {
    const [isPasswordVisible, setIsPasswordVisiblity] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisiblity((prevState: boolean) => !prevState);
    };

    return(
        <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 ml-2">{label}</label>
            <div className="relative w-full max-w-sm">
            <input
                id="toggle-password"
                type={isPasswordVisible ? "text" : "password"}
                className="w-72 ml-2 input px-3 py-2 border bg-purple-100 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter password"
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Toggle password visibility"
            >
                {isPasswordVisible ? (
                <IconEyeOff className="w-5 h-5" />
                ) : (
                <IconEye className="w-5 h-5" />
                )}
            </button>
            </div>
        </div>
    )
}


