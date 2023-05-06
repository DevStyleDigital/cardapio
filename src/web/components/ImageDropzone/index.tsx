import { TrashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FilePond } from 'react-filepond';
import { toast } from 'react-toastify';

type FileUploaderProps = {
  id: string;
  required?: boolean;
  className?: string;
  defaultValue?: string | File;
  onFileUpload: (file: File | null) => void;
};

export const ImageDropzone = ({
  id,
  className,
  defaultValue,
  onFileUpload,
  required,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<any>(
    typeof defaultValue === 'string'
      ? [
          {
            source: 'default', //don't know what should be the value
            options: {
              type: 'local',
              file: {
                name: 'default.webp',
                size: 189397, //correct size of the file
                type: 'image/webp',
              },
              metadata: {
                poster: defaultValue,
              },
            },
          },
        ]
      : defaultValue
      ? [defaultValue]
      : [],
  );

  useEffect(() => {
    onFileUpload(files?.[0]?.file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    setFiles(
      typeof defaultValue === 'string'
        ? [
            {
              source: 'default', //don't know what should be the value
              options: {
                type: 'local',
                file: {
                  name: 'default.webp',
                  size: 189397, //correct size of the file
                  type: 'image/webp',
                },
                metadata: {
                  poster: defaultValue,
                },
              },
            },
          ]
        : defaultValue
        ? [defaultValue]
        : [],
    );
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
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};
