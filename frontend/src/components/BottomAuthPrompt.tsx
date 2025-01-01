

export const BottomAuthPrompt = ({ isSignup }: { isSignup: boolean }) => {
    return (
        <div>
            {isSignup ? (
                <>
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                </>
            ) : (
                <>
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </>
            )}
        </div>
    );
}