

export const BlogEditorSkeleton = () => {
    return(
        <div>
            <div>
                <div className="p-2 animate-pulse">
                    <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div> {/* Label */}
                    <div className="h-10 w-full bg-gray-300 rounded"></div> {/* Input Box */}
                </div>
            </div>
            <div>
        <div className="w-full p-2 mt-5 animate-pulse">
            <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div> {/* Label */}
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 bg-gray-300 rounded"></div> {/* Icon Placeholder */}
                        <div className="h-4 w-20 bg-gray-300 rounded"></div> {/* Filename Placeholder */}
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-b-lg">
                    <div className="h-40 w-full bg-gray-300 rounded"></div> {/* Textarea Placeholder */}
                </div>
            </div>
        </div>
            </div>
            <div>
                <div className="p-2">
                <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}