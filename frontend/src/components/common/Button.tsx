interface ButtonProps {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({label, onClick}: ButtonProps) => {
    return(
        <div>
            <button type="button" onClick={onClick} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800  focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">{label}</button>
        </div>
    )
}