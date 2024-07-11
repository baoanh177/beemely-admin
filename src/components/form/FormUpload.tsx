import { message } from "antd";
import "@/assets/scss/overwrite/index.scss";
import imageError from "@/assets/images/imgError-table.jpg";
import imageFile from "@/assets/images/img-file.png";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
const UpdateImage: React.FC = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleDeleteImage = (uid: string) => {
    const updatedFileList = fileList.filter((file) => file.name !== uid);
    setFileList(updatedFileList);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      newFiles.forEach((file) => {
        if (file.name === "error.jpg") {
          message.error("Error uploading file, please try again");
          setError(`Error uploading file, please try again ${error}`);
          return;
        }
      });

      setFileList((prevFileList) => [...prevFileList, ...newFiles]);
    }
  };

  const renderFileIcon = (file: File) => {
    if (file.type && file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-[100px] w-[100px] rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = imageError;
          }}
        />
      );
    } else {
      return <img src={imageFile} alt={file.name} className="h-[100px] w-[100px] rounded-lg object-cover" />;
    }
  };
  return (
    <div className="custom-upload flex h-[240px] items-center justify-center rounded-lg bg-gray-25 px-3 py-6">
      <div className="flex-col items-center gap-4">
        <div className="flex justify-center">
          {fileList.map((file, index) => (
            <div key={index} className="relative mx-2 inline-block text-center">
              {renderFileIcon(file)}
              <button onClick={() => handleDeleteImage(file.name)}>
                <IoIosCloseCircle className="absolute right-1 top-1 h-[24px] w-[24px] rounded-circle text-green-100" />
              </button>
            </div>
          ))}
        </div>
        {fileList.length === 0 && <div className="text-m-regular mt-3 text-center text-gray-400">Drag and drop image here, or click add image</div>}
        <div className="mt-4 flex justify-center">
          <label
            htmlFor="file-upload"
            className="text-m-medium inline-block cursor-pointer rounded bg-primary-50 px-[14px] py-[10px] text-primary-500"
          >
            Add image
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} multiple className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
