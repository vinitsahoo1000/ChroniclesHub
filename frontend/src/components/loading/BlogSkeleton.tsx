

export const BlogSkeleton = () => {
    return(
        <div>
                <div className="container mx-auto p-4">
                <div className="pt-4 h-8 bg-gray-200 rounded-md animate-pulse"></div>

            <div className="flex justify-center pt-7">
                <div className="w-1/2 max-w-xl h-48 bg-gray-200 rounded-lg shadow-lg animate-pulse"></div>
            </div>

            <div className="text-xl text-center pt-7">
                <div className="prose prose-lg max-w-none whitespace-pre-wrap font-semibold text-slate-500">
                <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-2"></div>
                <div className="h-6 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>

            <div className="flex items-center mt-8">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full shadow-lg animate-pulse"></div>
                    <div className="flex flex-col space-y-2">
                        <div className="w-24 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="mt-10 ml-5 flex space-x-4">
                <div className="py-1.5 px-3 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="py-1.5 px-3 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
            </div>
    )
}