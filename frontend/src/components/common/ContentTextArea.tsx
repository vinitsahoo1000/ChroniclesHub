interface ContentTextAreaProps {
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    value?: string;
    name?: string;
}

export const ContentTextArea: React.FC<ContentTextAreaProps> = ({ onChange, handleFileChange, file, value, name }) => {
    return (
        <div>
            <form className="w-full p-2 mt-5">
                <label htmlFor="editor" className="block mb-2 text-sm font-medium text-gray-900">
                    Content
                </label>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x">
                            <div className="flex items-center space-x-1 sm:pe-4">
                                <input
                                    type="file"
                                    className="hidden"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 12 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                        />
                                    </svg>
                                    <span className="sr-only">Attach file</span>
                                </button>
                                {file && (
                                    <span className="text-sm text-gray-600 truncate max-w-xs">
                                        {file.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-white rounded-b-lg">
                        <textarea
                            id="editor"
                            name={name}
                            value={value}
                            rows={16}
                            onChange={onChange}
                            className="block w-full px-3 py-2 text-sm text-gray-800 bg-white border-0 focus:ring-0 resize-none"
                            placeholder="Write an article..."
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};