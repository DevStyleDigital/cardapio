import { TrashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

type FileUploaderProps = {
  id: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  onFileUpload: (file: File | null) => void;
};

export const ImageDropzone = ({
  id,
  className,
  defaultValue,
  onFileUpload,
  required,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    if (
      file &&
      [/* 'image/jpg', 'image/jpeg', 'image/png',  */ 'image/webp'].includes(file.type)
    ) {
      onFileUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.warn('We only accept image type .webp');
    }
  };

  return (
    <label htmlFor={id} className="h-full w-full">
      <div
        className={clsx(
          'border-2 overflow-hidden relative h-full w-full border-dashed bg-white ring-primary-500/30 focus-within:border-gray-950 focus-within:ring-4 border-gray-400 rounded-md flex items-center justify-center flex-col',
          className,
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="button"
      >
        {selectedFile && (imagePreview || defaultValue) && (
          <button
            type="button"
            aria-label="Remove image"
            className="absolute z-10 top-2 right-2 p-2 hover:text-red-500 focus:text-red-500"
            onClick={(ev) => {
              ev.preventDefault();
              if (fileInputRef.current) fileInputRef.current.value = '';
              setSelectedFile(null);
              setImagePreview('none');
              onFileUpload(null);
            }}
          >
            <TrashIcon className="w-4 h-4 mt-px" />
          </button>
        )}
        <span className="sr-only">Drag and drop a file here</span>
        {imagePreview !== 'none' && selectedFile && (imagePreview || defaultValue) ? (
          <div className="">
            <Image
              width={2080}
              height={2080}
              src={imagePreview || defaultValue!}
              alt="Selected file preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <span className="py-10 text-center px-2">
            Drag and drop a file here, or click to select a file
          </span>
        )}
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          required={required}
          // accept=".jpg,.jpeg,.png,.webp"
          accept=".webp"
          className="absolute opacity-0"
          onChange={handleFileChange}
        />
      </div>
    </label>
  );
};
