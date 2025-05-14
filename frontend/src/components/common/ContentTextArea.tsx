import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

interface ContentTextAreaProps {
    setValue: (value: string)=> void
    value?: string;
    name?: string;
}

const Font = Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'serif', 'monospace', 'roboto', 'arial'];
Quill.register(Font, true);

const toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
];

const modules = {
    toolbar: toolbarOptions
};

const formats = [
    'font', 'header', 'bold', 'italic', 'underline', 'blockquote',
    'code-block', 'list', 'bullet', 'link', 'image'
];

export const ContentTextArea = ({value,setValue}:ContentTextAreaProps) => {

    return (
        <div>
            <ReactQuill theme="snow" value={value} onChange={setValue} className='h-80' modules={modules} formats={formats}/>
        </div>
    );
};