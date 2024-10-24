// components/form/QuillEditor.tsx
import ReactQuill from "react-quill";
import Label from "./Label";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  label?: string;
  value: string;
  onChange: (content: string) => void;
  error?: string;
  placeholder?: string;
}

const QuillEditor = ({ label, value, onChange, error, placeholder }: QuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "image"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  const formats = ["header", "bold", "italic", "underline", "strike", "image", "align", "list", "bullet", "link"];

  return (
    <div className="space-y-2">
      {label && <Label text={label} />}
      <div className="relative">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="bg-white"
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default QuillEditor;
