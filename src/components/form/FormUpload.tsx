import { Upload, message } from "antd";
import Button from "@/components/Button";
import "@/assets/scss/overwrite/index.scss";

import React, { useState } from "react";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { IoIosCloseCircle } from "react-icons/io";
const UpdateImage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteImage = (uid: string) => {
    const updatedFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(updatedFileList);
    setSelectedFiles(selectedFiles.filter((id) => id !== uid));
  };

  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: ({ file, fileList: newFileList }) => {
      const updatedFileList = newFileList.map((file) => {
        if (file.originFileObj) {
          file.thumbUrl = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });

      if (file.name === "error.jpg") {
        file.status = "error";
      }

      if (file.status === "error") {
        setError("Error uploading file, please try again.");
        message.error(`Error uploading file, please try again ${error}`);
      } else {
        setError(null);
      }
      setFileList(updatedFileList);
    },
    showUploadList: false,
    listType: "picture",
    defaultFileList: [],
  };

  return (
    <div className="custom-upload flex h-[240px] items-center justify-center rounded-lg bg-gray-25 px-3 py-6">
      <div className="flex-col items-center gap-4">
        <div className="flex justify-center">
          {fileList.map((file) => (
            <div key={file.uid} className="relative mx-2 inline-block text-center">
              <img src={file.thumbUrl || file.url} alt={file.name} className="h-[100px] w-[100px] rounded-lg object-cover" />
              <button onClick={() => handleDeleteImage(file.uid)}>
                <IoIosCloseCircle className="absolute right-1 top-1 h-[24px] w-[24px] rounded-circle text-green-100" />
              </button>
            </div>
          ))}
        </div>
        {fileList.length === 0 && <div className="text-m-regular mt-3 text-center text-gray-400">Drag and drop image here, or click add image</div>}

        <div className="mt-4 flex justify-center">
          <Upload {...props} fileList={fileList} accept="">
            <Button type="ghost" text="Add image" />
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
