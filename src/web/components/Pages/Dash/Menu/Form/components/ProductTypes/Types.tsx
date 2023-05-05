import type { ProductType } from 'types/menu';
import { Type } from './Type';
import React, { useEffect, useState } from 'react';
import { Modal } from '@web/components/Modal';

export const Types = ({
  onDelete,
  productTypes,
  setProductTypes,
}: {
  onDelete: (v: string[]) => void;
  productTypes: ProductType[];
  setProductTypes: React.Dispatch<React.SetStateAction<ProductType[]>>;
}) => {
  const [productTypesDeleted, setProductTypesDeleted] = useState<string[]>([]);

  useEffect(() => {
    onDelete(productTypesDeleted);
  }, [productTypesDeleted, onDelete]);

  return (
    <ul className="flex gap-6 mt-4 flex-wrap">
      {productTypes.map(({ id, type, images }, i) => (
        <li key={id} className="min-[330px]:w-fit w-full">
          <Modal.Root id="edit-type-modal">
            <Type
              id={id}
              type={type}
              defaultImages={
                images as {
                  image?: string;
                  advertiser?: string;
                }
              }
              onImagesChange={(images) =>
                setProductTypes((prev) => {
                  const newPrev = [...prev];
                  newPrev[i].images = images;
                  return newPrev;
                })
              }
              onInputChange={(value) =>
                setProductTypes((prev) => {
                  const newPrev = [...prev];
                  newPrev[i].type = value;
                  return newPrev;
                })
              }
              onClickDelete={() => {
                setProductTypesDeleted((prev) => [...prev, id]);
                setProductTypes((prev) => {
                  const newPrev = [...prev];
                  newPrev.splice(i, 1);
                  return newPrev;
                });
              }}
            />
          </Modal.Root>
        </li>
      ))}
    </ul>
  );
};
