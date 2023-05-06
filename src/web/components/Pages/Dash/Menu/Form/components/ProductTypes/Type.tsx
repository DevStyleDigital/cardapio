import { Cross1Icon, Pencil1Icon } from '@radix-ui/react-icons';
import { Modal, useModal } from '@web/components/Modal';
import { ProductType } from 'types/menu';
import { Form } from './Form';
import { useEffect } from 'react';

export const Type = ({
  id,
  type,
  onClickDelete,
  onImagesChange,
  onInputChange,
  defaultImages,
  defaultModalOpen,
}: ProductType & {
  defaultModalOpen?: boolean;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
  defaultImages?: { image?: string; advertiser?: string };
  onImagesChange?: (images: { image: File | null; advertiser: File | null }) => void;
  onInputChange?: (value: string) => void;
}) => {
  const { toggleModal } = useModal();

  useEffect(() => {
    defaultModalOpen && toggleModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal.Trigger
        id={id}
        asChild
        role="button"
        className="bg-white min-[330px]:w-fit w-full max-w-full justify-between shadow-lg hover:shadow-sm transition group gap-4 px-4 py-2 overflow-hidden rounded-[20px] flex items-center"
        onClick={(ev) => {
          if ((ev.target as HTMLElement).id === 'delete-type') return 'no-open';
        }}
      >
        <div>
          <span className="uppercase text-left break-all">{type}</span>
          <Modal.Trigger className="h-auto transition hover:text-blue-500">
            <Pencil1Icon className="w-3 h-3 mt-px" />
          </Modal.Trigger>
          <button
            type="button"
            id="delete-type"
            className="h-auto transition hover:text-red-500"
            onClick={onClickDelete}
          >
            <Cross1Icon className="w-3 h-3 mt-px pointer-events-none" />
          </button>
        </div>
      </Modal.Trigger>
      <Form
        id={id}
        onImagesChange={onImagesChange}
        onInputChange={onInputChange}
        defaultImages={defaultImages}
        defaultInputValue={type}
      />
    </>
  );
};
