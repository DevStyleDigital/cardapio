import type { ProductType } from 'types/menu';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Input } from '@web/components/Input';
import { useEffect, useState } from 'react';

export const ProductTypes = ({
  defaultValue,
  onChange,
}: {
  onChange: (v: ProductType[]) => void;
  defaultValue?: ProductType[];
}) => {
  const [newProductType, setNewProductType] = useState('');
  const [productTypes, setProductTypes] = useState<ProductType[]>(defaultValue || []);
  const [newProductTypeError, setNewProductTypeError] = useState<string | null>(null);

  function handleNewProductType() {
    if (!newProductType.length) {
      setNewProductTypeError('Input required*');
      return;
    }
    setProductTypes((prev) => [
      { id: Date.now().toString(), type: newProductType },
      ...prev,
    ]);
    setNewProductType('');
  }

  useEffect(() => onChange(productTypes), [productTypes, onChange]);

  return (
    <div>
      <h2 className="text-xl font-bold uppercase">Menu products types:</h2>
      <Input.Root id="menu-name" error={newProductTypeError} className="max-w-lg">
        <Input.Label>New product type:</Input.Label>
        <div className="flex gap-4">
          <Input
            placeholder="Name of product type"
            name="product_type"
            value={newProductType}
            onChange={({ target: { value } }) => {
              setNewProductType(value);
              setNewProductTypeError(null);
            }}
          />
          <Button type="button" className="w-min gap-2" onClick={handleNewProductType}>
            <span>Inset</span>
            <PlusIcon className="w-5 h-5" />
          </Button>
        </div>
      </Input.Root>
      <ul className="flex gap-6 mt-4 flex-wrap">
        {productTypes.map(({ id, type }, i) => (
          <li key={id} className="min-[330px]:w-fit w-full">
            <button
              id={id}
              type="button"
              className="bg-white min-[330px]:w-fit w-full max-w-full justify-between shadow-lg hover:shadow-sm transition group gap-4 px-4 py-2 overflow-hidden rounded-[20px] flex items-center"
              onClick={() =>
                setProductTypes((prev) => {
                  const newPrev = [...prev];
                  newPrev.splice(i, 1);
                  return newPrev;
                })
              }
            >
              <span className="uppercase text-left break-all">{type}</span>
              <div className="h-auto transition group-hover:text-red-500">
                <Cross1Icon className="w-3 h-3 mt-px" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
