import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import { Modal } from '@web/components/Modal';
import { useEffect, useState } from 'react';

export const Form = ({
  id,
  onImagesChange,
  onInputChange,
  defaultImages,
  defaultInputValue,
}: {
  id: string;
  onImagesChange?: (images: { image: File | null; advertiser: File | null }) => void;
  defaultImages?: { image?: string; advertiser?: string };
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(defaultInputValue || '');
  const [image, setImage] = useState<File | string | null>(defaultImages?.image || null);
  const [advertiser, setAdvertiser] = useState<File | string | null>(
    defaultImages?.advertiser || null,
  );

  return (
    <Modal.Portal className="max-sm:w-full max-sm:h-full bg-white rounded-lg max-sm:rounded-none">
      <div className="p-8 w-full h-full relative flex flex-col gap-4">
        <Modal.Trigger
          tabIndex={1}
          className="absolute z-10 top-2 right-2 p-2 hover:text-red-500 focus:text-red-500"
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
          error={!image ? 'Input required*' : null}
          className="lg:max-w-lg"
        >
          <Input.Label>Product type image:</Input.Label>
          <ImageDropzone
            required
            id={`product-type-image-${id}`}
            className="px-8 max-h-60"
            defaultValue={defaultImages?.image}
            onFileUpload={setImage}
          />
        </Input.Root>
        <Input.Root
          id={`advertiser-image-${id}`}
          error={!advertiser ? 'Input required*' : null}
          className="lg:max-w-lg"
        >
          <Input.Label>Advertiser image:</Input.Label>
          <ImageDropzone
            required
            id={`advertiser-image-${id}`}
            className="px-8 max-h-60"
            defaultValue={defaultImages?.advertiser}
            onFileUpload={setAdvertiser}
          />
        </Input.Root>

        <Modal.Trigger
          asChild
          onClick={() => {
            if (!inputValue.length || !image || !advertiser) return 'no-open';
            onInputChange && onInputChange(inputValue);
            onImagesChange &&
              onImagesChange({
                advertiser: typeof advertiser !== 'string' ? advertiser : null,
                image: typeof image !== 'string' ? image : null,
              });
          }}
        >
          <Button type="button">Save Changes</Button>
        </Modal.Trigger>
      </div>
    </Modal.Portal>
  );
};
