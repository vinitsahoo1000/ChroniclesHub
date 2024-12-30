interface SubHeadingProps {
    label: string;
}

export const SubHeading = ({label}: SubHeadingProps) => {
    return(
        <div className="flex flex-col items-center text-lg font-medium text-slate-600 max-w-sm mx-auto">
            <div>
                {label}
            </div>
        </div>
    )
}