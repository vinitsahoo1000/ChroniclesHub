import { useState } from "react"
import { deleteComment } from "../api/api";
import { useParams } from "react-router-dom";


interface DropDownMenuProps {
  commentId: string;
  fetchComments: ()=> void;
}

export const DropDownMenu = ({commentId,fetchComments}:DropDownMenuProps) =>{
    const [isOpen,setIsOpen] = useState(false);
    const {id} = useParams();
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev)
    }

    const handleDelete = async() => {
      try {
        await deleteComment(id!, commentId); 
        fetchComments();
        setIsOpen(false);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }

    return(
        <div>
            <button id="dropdownMenuIconButton" onClick={toggleDropdown} data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium 
                text-center text-gray-900 bg-tr rounded-lg hover:bg-gray-100 focus:outline-none dark:text-black" type="button">
                <svg className="w-4 h-4 pt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
            </button>
            {isOpen && (
        <div
          id="dropdownDots"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}
        </div>
    )
}