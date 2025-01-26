

export const CommentSkeleton = () => {
    return(
                <div className="w-full animate-pulse">
                    <article className="p-6 bg-gray-100 rounded-lg">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <div className="mr-3 w-6 h-6 rounded-full bg-gray-300"></div>
                                <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                            </div>
                            <div className="w-16 h-3 bg-gray-300 rounded-md"></div>
                        </footer>
                        <div className="space-y-2">
                            <div className="w-full h-4 bg-gray-300 rounded-md"></div>
                            <div className="w-5/6 h-4 bg-gray-300 rounded-md"></div>
                        </div>
                    </article>
                </div>
    )
}