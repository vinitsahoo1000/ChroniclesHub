import { useState } from "react";

interface PasswordBoxProps {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordBox = ({label,onChange}:PasswordBoxProps) => {
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
                onChange={onChange}
            />
            </div>
            <div>
            <input
            type="checkbox"
            checked={isPasswordVisible}
            onChange={togglePasswordVisibility}
            className="mt-4 ml-4"
            />
            <label className="text-sm font-medium text-gray-700 ml-2">Show Password</label>
            </div>
        </div>
    )
}

