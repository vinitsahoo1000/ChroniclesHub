
interface ImageInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({onChange}:ImageInputProps)=>{
    return(
        <div>
            <input type="file"  accept="image/*" onChange={onChange} />
        </div>
    )
}