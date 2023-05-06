import type { ProductType } from 'types/menu';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Input } from '@web/components/Input';
import { useEffect, useState } from 'react';
import { Types } from './Types';

export const ProductTypes = ({
  defaultValue,
  value,
  onChange,
  onDelete,
}: {
  onChange: (v: ProductType[]) => void;
  onDelete: (v: string[]) => void;
  defaultValue?: ProductType[];
  value?: ProductType[];
}) => {
  const [newProductType, setNewProductType] = useState('');
  const [productTypes, setProductTypes] = useState<ProductType[]>(value || []);
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
      <h2 className="text-xl font-bold uppercase mb-4">Menu products types:</h2>
      <Input.Root id="menu-name" error={newProductTypeError} className="max-w-lg">
        <Input.Label>New product type*:</Input.Label>
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
      <Types
        defaultValue={defaultValue}
        productTypes={productTypes}
        setProductTypes={setProductTypes}
        onDelete={onDelete}
      />
    </div>
  );
};
