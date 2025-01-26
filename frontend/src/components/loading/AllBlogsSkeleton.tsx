

export const AllBlogsSkeleton = () => {
    return(
        <div className="w-auto bg-white shadow-lg rounded-lg p-4 m-4 animate-pulse">
                    <div>
                        <div className="flex">
                            <div className="w-6 h-6 mt-1 rounded-full bg-gray-200"></div>
                            <div className="ml-2 mb-1 pt-1 text-sm w-3/4 bg-gray-200 h-4 rounded-full"></div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold p-2">
                        <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
                    </div>
                    <div className="text-lg p-2">
                        <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
                    </div>
                    <div className="flex justify-between p-2">
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="flex">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
                        </div>
                        <div className="flex">
                            <div className="h-6 w-6 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-8 ml-2"></div>
                        </div>
                    </div>
                </div>
    )
}