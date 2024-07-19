import { message } from "antd";
import "@/assets/scss/overwrite/index.scss";
import imageError from "@/assets/images/imgError-table.jpg";
import imageFile from "@/assets/images/img-file.png";
import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import UpdateGrid from "../grid/UpdateGrid";

interface UpdateImageProps {
  isMultiple?: boolean;
  title?: string;
  text?: string;
  label: string;
  onImageUpload?: (imageURL: string) => void;
  currentImageUrl?: string;
}

const UploadImage: React.FC<UpdateImageProps> = ({ isMultiple = false, title, text, label, onImageUpload, currentImageUrl = "" }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(currentImageUrl);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (currentImageUrl) {
      const fakeFile: File = new File([new Blob()], "currentImage.png", { type: "image/png" });
      setFileList([fakeFile]);
      setUploadedImageUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleDeleteImage = (uid: string) => {
    const updatedFileList = fileList.filter((file) => file.name !== uid);
    setFileList(updatedFileList);
    setUploadedImageUrl("");
    onImageUpload?.("");
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const imageURL = await uploadImage(newFiles[0]);
      setUploadedImageUrl(imageURL);
      onImageUpload?.(imageURL);
      setFileList(newFiles);
    }
  };

  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "beemely");
      formData.append("folder", "Beemely");
      const response = await fetch("https://api.cloudinary.com/v1_1/dbju2ugir/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw error;
    }
  };

  const renderFileIcon = () => {
    if (uploadedImageUrl) {
      return (
        <img
          src={uploadedImageUrl}
          alt="Uploaded Image"
          className="h-[100px] w-[100px] rounded-lg object-cover"
          onError={(e) => {
            e.currentTarget.src = imageError;
          }}
        />
      );
    } else {
      return <img src={imageFile} alt="Default Image" className="h-[100px] w-[100px] rounded-lg object-cover" />;
    }
  };

  return (
    <UpdateGrid
      colNumber="1"
      rate="1"
      groups={{
        colLeft: (
          <div className="flex flex-col rounded-xl bg-white p-6">
            <div className="flex flex-col gap-[14px]">
              {title && <div className="text-xl-semibold text-black-500">{title}</div>}
              {text && <div className="text-m-medium text-black-300">{text}</div>}
            </div>
            <div className="custom-upload flex h-[240px] items-center justify-center rounded-lg bg-gray-25 px-3 py-6">
              <div className="flex-col items-center gap-4">
                <div className="flex justify-center">
                  {fileList.map((file, index) => (
                    <div key={index} className="relative mx-2 inline-block text-center">
                      {renderFileIcon()}
                      <button onClick={() => handleDeleteImage(file.name)}>
                        <IoIosCloseCircle className="absolute right-1 top-1 h-[24px] w-[24px] rounded-circle text-green-100" />
                      </button>
                    </div>
                  ))}
                </div>
                {fileList.length === 0 && (
                  <div className="text-m-regular mt-3 text-center text-gray-400">Drag and drop image here, or click add image</div>
                )}
                <div className="mt-4 flex justify-center">
                  <label
                    htmlFor="file-upload"
                    className="text-m-medium inline-block cursor-pointer rounded bg-primary-50 px-[14px] py-[10px] text-primary-500"
                  >
                    {label}
                  </label>
                  <input id="file-upload" type="file" onChange={handleFileChange} multiple={isMultiple} className="hidden" />
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default UploadImage;
