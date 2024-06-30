import { Button, Upload } from "antd";
import React, { useState } from "react";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const handleImageClick = (uid: string) => {
    const newSelectedFiles = new Set(selectedFiles);
    if (newSelectedFiles.has(uid)) {
      newSelectedFiles.delete(uid);
    } else {
      newSelectedFiles.add(uid);
    }
    setSelectedFiles(newSelectedFiles);
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
    <>
      <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", marginTop: 10 }}>
        {fileList.map((file) => (
          <div
            key={file.uid}
            style={{
              display: "inline-block",
              margin: 10,
              position: "relative",
              textAlign: "center",
            }}
            onClick={() => handleImageClick(file.uid)}
          >
            <img
              src={file.thumbUrl || file.url}
              alt={file.name}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 8,
                border: selectedFiles.has(file.uid) ? "none" : "2px solid transparent",
                cursor: "pointer",
              }}
            />
            {selectedFiles.has(file.uid) && (
              <input
                type="checkbox"
                checked
                readOnly
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  width: 20,
                  height: 20,
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  border: "1px solid #D3F4EF",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-m-regular mt-3 text-sm text-gray-400">Drag and drop image here, or click add image</p>

      <Upload {...props} fileList={fileList}>
        <Button className="m-auto mt-3 border-none bg-primary-50 text-primary-500">Add Image</Button>
      </Upload>
    </>
  );
};

export default App;
