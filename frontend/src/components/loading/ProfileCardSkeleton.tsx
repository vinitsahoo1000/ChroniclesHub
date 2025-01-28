
export const ProfileCardSkeleton = () => {
    return(
        <div>
        <div className="bg-white shadow-lg border rounded-xl w-96 pb-11 mx-auto mt-10 animate-pulse">
            <div className="relative h-28 bg-gradient-to-r from-blue-300 to-purple-300">
                <div className="w-28 h-28 rounded-full absolute left-1/2 -translate-x-1/2 -bottom-12 border-4 border-white bg-gray-300"></div>
            </div>
            <div className="pt-16 px-4">
                <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded-md mb-2"></div>
                <div className="h-5 w-2/3 mx-auto bg-gray-300 rounded-md mb-2"></div>
                <div className="h-4 w-1/2 mx-auto bg-gray-300 rounded-md mb-4"></div>
                <div className="border-y border-solid border-gray-300 pb-4 mt-6">
                    <div className="flex justify-between px-8">
                        <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
                    </div>
                    <div className="flex justify-between px-14 mt-2">
                        <div className="h-4 w-8 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-8 bg-gray-300 rounded-md"></div>
                        <div className="h-4 w-8 bg-gray-300 rounded-md"></div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="h-10 w-36 bg-gradient-to-r from-blue-300 to-purple-300 rounded-md"></div>
                </div>
            </div>
            </div>
            </div>
    )
}