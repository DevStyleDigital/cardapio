import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

type FileUploaderProps = {
  className?: string;
  defaultValue?: string;
  onFileUpload: (file: File) => void;
};

export const ImageDropzone = ({
  className,
  defaultValue,
  onFileUpload,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);

    if (file) {
      onFileUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    setSelectedFile(file);
    onFileUpload(file);

    if (
      file &&
      ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label htmlFor="file-input" className="h-full w-full">
      <div
        className={clsx(
          'border-2 overflow-hidden h-full w-full border-dashed border-gray-400 rounded-md flex items-center justify-center flex-col',
          className,
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
      >
        <span className="sr-only">Drag and drop a file here</span>
        {!selectedFile && !defaultValue && (
          <span className="py-10">
            Drag and drop a file here, or click to select a file
          </span>
        )}
        {selectedFile && (imagePreview || defaultValue) && (
          <div className="">
            <Image
              width={2080}
              height={2080}
              src={imagePreview || defaultValue!}
              alt="Selected file preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <input
          type="file"
          id="file-input"
          required
          accept=".jpg,.jpeg,.png,.webp"
          className="absolute opacity-0"
          onChange={handleFileChange}
        />
      </div>
    </label>
  );
};
