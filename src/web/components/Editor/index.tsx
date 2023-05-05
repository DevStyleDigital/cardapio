import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';

const DynamicQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

export const Editor = ({
  id,
  required,
  defaultValue,
  placeholder,
  onChange,
}: {
  id?: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: (v: string) => void;
  placeholder: string;
}) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="w-full relative h-full">
      <textarea
        className="w-px h-px top-16 left-16 [clip:rect(0px,0px,0px,0px)] absolute"
        aria-hidden
        tabIndex={-1}
        required={required}
        value={value}
        onChange={() => {}}
      />
      <DynamicQuill
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-[calc(100%-3rem)] [&_.ql-editor]:text-lg [&_.ql-container]:bg-white [&_.ql-toolbar]:bg-white [&_.ql-container]:!border-gray-400 [&_.ql-toolbar]:!border-gray-400 [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md"
        modules={{
          toolbar: [['bold', 'italic'], ['clean']],
          clipboard: {
            matchVisual: false,
          },
        }}
        theme="snow"
        onChange={(v) => {
          setValue(v);
          onChange && onChange(v);
        }}
      />
    </div>
  );
};
