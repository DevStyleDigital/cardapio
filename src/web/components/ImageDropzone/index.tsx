import React, { useEffect, useState } from 'react';
import { FilePond } from 'react-filepond';

type FileUploaderProps = {
  id: string;
  required?: boolean;
  className?: string;
  defaultValue?: boolean | string | File;
  onFileUpload: (file: File | null) => void;
};

function genDefaultFile(defaultValue: any) {
  return {
    source: 'default', //don't know what should be the value
    options: {
      type: 'local',
      file: {
        name: 'default-image.webp',
        size: 189397, //correct size of the file
        type: 'image/webp',
      },
      metadata: {
        poster: defaultValue,
      },
    },
  };
}

export const ImageDropzone = ({
  id,
  className,
  defaultValue,
  onFileUpload,
  required,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<any>(
    typeof defaultValue === 'string'
      ? defaultValue.length
        ? [genDefaultFile(defaultValue)]
        : []
      : defaultValue
      ? [defaultValue]
      : [],
  );

  useEffect(() => {
    if (!files?.[0]?.options?.metadata?.poster)
      onFileUpload(files?.[0]?.file || files?.[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    if (typeof defaultValue === 'string' && defaultValue.length) {
      setFiles([genDefaultFile(defaultValue)]);
    } else if (defaultValue === null) setFiles([]);
    else if (
      defaultValue &&
      ((defaultValue as any)?.options?.file as File)?.name !== 'default-image.webp'
    )
      setFiles([defaultValue]);
  }, [defaultValue]);

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        required={required}
        credits={false}
        acceptedFileTypes={['image/webp']}
        maxFileSize="3MB"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
