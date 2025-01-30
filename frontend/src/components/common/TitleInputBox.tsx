interface TitleInputBoxProps {
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}


export const TitleInputBox = ({name, onChange,value}:TitleInputBoxProps) => {
    return(
        <div className="p-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
            </label>
            <textarea value={value} name={name} onChange={onChange} className="block w-full mt-1 px-3 py-2 text-sm border rounded-md resize-none" placeholder="Write your title here..." required/>
            </div>
    )
}