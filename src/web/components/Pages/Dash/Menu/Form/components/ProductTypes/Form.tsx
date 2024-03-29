import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import { Modal, useModal } from '@web/components/Modal';
import { useEffect, useState } from 'react';

export const Form = ({
  id,
  onImagesChange,
  onInputChange,
  defaultImages,
  defaultInputValue,
}: {
  id: string;
  onImagesChange?: (images: {
    image: File | string | null;
    advertiser: File | string | null;
  }) => void;
  defaultImages?: { image?: string; advertiser?: string };
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
}) => {
  const { open } = useModal();
  const [inputValue, setInputValue] = useState(defaultInputValue || '');

  const [imageFile, setImageFile] = useState<File | boolean | null>(
    !!defaultImages?.image || !!defaultImages?.image?.length || null,
  );
  const [advertiserFile, setAdvertiserFile] = useState<File | boolean | null>(
    !!defaultImages?.advertiser || !!defaultImages?.advertiser?.length || null,
  );

  function handleResetValues() {
    setInputValue(defaultInputValue || '');
    setImageFile(null);
    setAdvertiserFile(null);
    // return 'no-open';
  }

  return (
    <Modal.Portal
      onBackdropClick={handleResetValues}
      className="max-sm:w-full max-sm:h-full bg-white w-[30rem] rounded-lg max-h-[calc(100vh-4rem)] max-sm:rounded-none overflow-y-auto"
    >
      <div className="p-8 w-full h-full relative flex flex-col gap-4">
        <Modal.Trigger
          tabIndex={1}
          className="absolute z-10 top-2 right-2 p-2 hover:text-red-500 focus:text-red-500"
          onClick={handleResetValues}
        >
          <Cross1Icon className="w-4 h-4 mt-px" />
        </Modal.Trigger>
        <Input.Root
          id="file-input"
          error={!inputValue.length ? 'Input required*' : null}
          className="lg:max-w-lg"
        >
          <Input.Label>Product type name:</Input.Label>
          <Input
            placeholder="Type name"
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
        </Input.Root>
        <Input.Root
          id={`product-type-image-${id}`}
          // error={!image ? 'Input required*' : null}
          error={null}
          className="lg:max-w-lg"
        >
          <Input.Label>Product type image:</Input.Label>
          {open && (
            <ImageDropzone
              id={`product-type-image-${id}`}
              className="px-8 max-h-60"
              defaultValue={
                imageFile === true
                  ? defaultImages?.image
                  : imageFile ?? defaultImages?.image
              }
              onFileUpload={(ev) => {
                setImageFile(ev || false);
              }}
            />
          )}
        </Input.Root>
        <Input.Root
          id={`advertiser-image-${id}`}
          // error={!advertiser ? 'Input required*' : null}
          error={null}
          className="lg:max-w-lg"
        >
          <Input.Label>Imagem patrocinador:</Input.Label>
          {open && (
            <ImageDropzone
              id={`advertiser-image-${id}`}
              className="px-8 max-h-60"
              defaultValue={
                advertiserFile === true
                  ? defaultImages?.advertiser
                  : advertiserFile ?? defaultImages?.advertiser
              }
              onFileUpload={(ev) => {
                setAdvertiserFile(ev || false);
              }}
            />
          )}
        </Input.Root>

        <Modal.Trigger
          asChild
          onClick={() => {
            if (!inputValue.length /* || !image || !advertiser */) return 'no-open';
            onInputChange && onInputChange(inputValue);
            onImagesChange &&
              onImagesChange({
                advertiser: !['boolean', 'string'].includes(typeof advertiserFile)
                  ? (advertiserFile as File).name !== 'default-image.webp'
                    ? (advertiserFile as File)
                    : defaultImages?.advertiser || null
                  : null,
                image: !['boolean', 'string'].includes(typeof imageFile)
                  ? (imageFile as File).name !== 'default-image.webp'
                    ? (imageFile as File)
                    : defaultImages?.image || null
                  : null,
              });

            handleResetValues();
          }}
        >
          <Button type="button">Save Changes</Button>
        </Modal.Trigger>
      </div>
    </Modal.Portal>
  );
};
