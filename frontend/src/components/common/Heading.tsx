

interface HeadingProps {
    label: string;
}

export const Heading = ({label}: HeadingProps) => {
    return(
        <div className="flex flex-col items-center text-3xl font-bold max-w-sm mx-auto">
            <div>
                {label}
            </div>
        </div>
    )
}