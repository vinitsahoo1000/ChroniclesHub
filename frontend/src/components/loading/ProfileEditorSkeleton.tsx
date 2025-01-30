
const ProfileEditorSkeleton = () => {
    return (
        <div className="flex justify-center items-center min-h-screen from-purple-100 to-blue-100 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-3xl">
                <div className="text-center">
                    <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
                </div>

                {/* Profile Picture Skeleton */}
                <div className="flex justify-center py-6">
                    <div className="w-28 h-28 rounded-full bg-gray-300 animate-pulse border-4 border-gray-200 shadow-md"></div>
                </div>

                <div className="space-y-4">
                    {/* Input Skeletons */}
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                </div>

                {/* Bio Skeleton */}
                <div className="mt-4">
                    <div className="w-72 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
                </div>

                {/* Button Skeleton */}
                <div className="flex justify-center mt-6">
                    <div className="w-36 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditorSkeleton;
