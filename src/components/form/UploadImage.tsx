import { message, Spin } from "antd";
import imageError from "@/assets/images/imgError.jpg";
import React, { useState, useEffect, useMemo } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { LoadingOutlined } from "@ant-design/icons";
interface UploadImageProps {
  isMultiple?: boolean;
  label?: string;
  onImageUpload?: (imageURL: string | string[]) => void;
  currentImageUrl?: string[];
  error?: string;
  id?: string;
}
const UploadImage: React.FC<UploadImageProps> = ({ isMultiple = false, label, onImageUpload, currentImageUrl = "", error, id }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputId = useMemo(() => id || `file-upload-${Math.random().toString(36).substring(2, 15)}`, [id]);
  useEffect(() => {
    if (currentImageUrl) {
      const initialUrls = Array.isArray(currentImageUrl) ? currentImageUrl : [currentImageUrl];
      const fakeFiles: File[] = initialUrls.map((index) => new File([new Blob()], `currentImage${index}.png`, { type: "image/png" }));
      setFileList(fakeFiles);
      setUploadedImageUrls(initialUrls);
    }
  }, [currentImageUrl]);
  const handleDeleteImage = (index: number) => {
    const updatedFileList = fileList.filter((_, i) => i !== index);
    setFileList(updatedFileList);
    const updatedImageUrls = uploadedImageUrls.filter((_, i) => i !== index);
    setUploadedImageUrls(updatedImageUrls);
    onImageUpload?.(isMultiple ? updatedImageUrls : updatedImageUrls[0] || "");
  };
  const preloadImage = (src: string) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setIsLoading(true);
      try {
        const imageUrls = await Promise.all(newFiles.map((file) => uploadImage(file)));
        await Promise.all(imageUrls.map(preloadImage));
        if (isMultiple) {
          const allImageUrls = [...uploadedImageUrls, ...imageUrls];
          setUploadedImageUrls(allImageUrls);
          onImageUpload?.(allImageUrls);
        } else {
          setUploadedImageUrls(imageUrls);
          onImageUpload?.(imageUrls[0]);
        }
        setFileList([...fileList, ...newFiles]);
      } catch (error) {
        message.error("Error uploading files, please try again");
        setUploadError("Error uploading files, please try again");
      } finally {
        setIsLoading(false);
      }
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

  const renderFileIcon = (url: string) => (
    <img
      src={url}
      alt="Uploaded Image"
      className="h-[100px] w-[100px] rounded-lg object-cover"
      onError={(e) => {
        e.currentTarget.src = imageError;
      }}
    />
  );

  const renderDefaultContent = () => (
    <div className="text-m-regular mt-3 text-center text-gray-400">
      {fileList.length === 0 ? "Kéo và thả hình ảnh vào đây, hoặc nhấp để thêm hình ảnh" : ""}
    </div>
  );

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-m-medium text-black-300">{label}</label>}
      <Spin indicator={<LoadingOutlined spin />} className="text-primary-300" size="large" spinning={isLoading}>
        <div className="custom-upload flex h-[260px] items-center justify-center rounded-lg bg-gray-25 px-3 py-6">
          <div className="flex-col items-center gap-4">
            {
              <div className="flex flex-wrap justify-center">
                {uploadedImageUrls.length > 0
                  ? uploadedImageUrls.map((url, index) => (
                      <div key={index} className="relative mx-2 inline-block text-center">
                        {renderFileIcon(url)}
                        <button onClick={() => handleDeleteImage(index)}>
                          <IoIosCloseCircle className="absolute right-1 top-1 h-[24px] w-[24px] rounded-circle text-green-100" />
                        </button>
                      </div>
                    ))
                  : renderDefaultContent()}
                {error && <div className="p-1 text-red-500">{error}</div>}
              </div>
            }
            {uploadError && <div className="mt-3 text-center text-red-500">{uploadError}</div>}
            <div className="mt-4 flex justify-center">
              <label
                htmlFor={inputId}
                className="text-m-medium inline-block cursor-pointer rounded bg-primary-50 px-[14px] py-[10px] text-primary-500"
              >
                {isMultiple ? "Thêm ảnh" : uploadedImageUrls.length > 0 ? "Thay đổi ảnh" : "Thêm ảnh"}
              </label>
              <input id={inputId} type="file" onChange={handleFileChange} multiple={isMultiple} className="hidden" />
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default UploadImage;
