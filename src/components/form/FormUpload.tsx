import { Button, Upload } from "antd";
import React, { useState } from "react";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { IoIosCloseCircle } from "react-icons/io";
const UpdateImage: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleDeleteImage = (uid: string) => {
    const updatedFileList = fileList.filter((file) => file.uid !== uid);
    setFileList(updatedFileList);
    setSelectedFiles(selectedFiles.filter((id) => id !== uid));
  };

  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange: ({ fileList: newFileList }) => {
      const updatedFileList = newFileList.map((file) => {
        if (file.originFileObj) {
          file.thumbUrl = URL.createObjectURL(file.originFileObj);
        }
        return file;
      });
      setFileList(updatedFileList);
    },
    showUploadList: false,
    listType: "picture",
    defaultFileList: [],
  };

  return (
    <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-100 bg-gray-25 px-24 py-12">
      <div className="flex-col items-center">
        <div className="flex justify-center">
          {fileList.map((file) => (
            <div
              key={file.uid}
              style={{
                display: "inline-block",
                margin: 10,
                position: "relative",
                textAlign: "center",
              }}
            >
              <img
                src={file.thumbUrl || file.url}
                alt={file.name}
                className="h-[100px] w-[100px] rounded-lg object-cover"
              />
              <button onClick={() => handleDeleteImage(file.uid)}>
                <IoIosCloseCircle className="absolute right-1 top-1 h-[24px] w-[24px] rounded-circle text-green-100" />
              </button>
            </div>
          ))}
        </div>
        {fileList.length === 0 && (
          <p className="text-m-regular mt-3 text-center text-sm text-gray-400">
            Drag and drop image here, or click add image
          </p>
        )}

        <div className="flex justify-center">
          <Upload {...props} fileList={fileList}>
            <Button className="m-auto mt-3 border-none bg-primary-50 text-primary-500">Add Image</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
};

export default UpdateImage;
