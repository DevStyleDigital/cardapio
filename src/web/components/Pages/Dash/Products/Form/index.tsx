import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import React, { useState } from 'react';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import type { Product } from 'types/product';
import type { Menu } from 'types/menu';
import { CurrencyInput } from '@web/components/CurrencyInput';
import { Editor } from '@web/components/Editor';
import { Select } from '@web/components/Select';

export const Form = ({ product, menus }: { product?: Product; menus: Menu[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState(product?.name || '');
  const [productDesc, setProductDesc] = useState(product?.text || '');
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productPrice, setProductPrice] = useState(product?.price || '0.00');
  const [selectedTypes, setSelectedTypes] = useState(product?.types ? product.types : []);
  const [selectedMenus, setSelectedMenus] = useState(product?.menus ? product.menus : []);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);

    const formData = new FormData();
    product?.name !== productName && formData.append('name', productName);
    product?.name !== productDesc && formData.append('text', productDesc);
    product?.name !== productPrice && formData.append('price', productPrice);
    productImage && formData.append('image', productImage, 'image');
    formData.append('menus', JSON.stringify(selectedMenus));
    formData.append('types', JSON.stringify(selectedTypes));

    http[!!product ? 'patch' : 'post'](
      `/api/product/${!!product ? product?.id : ''}`,
      formData,
      {
        headers: { 'content-type': 'application/x-www-form-urlencode' },
      },
    )
      .then(() => {
        toast.success('Product created!');
        router.push('/admin/dash/product');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form className="px-8 flex flex-col gap-4 pb-10" onSubmit={handleSubmit}>
      <div className="flex max-lg:flex-col-reverse gap-4 lg:gap-20">
        <div className="flex flex-col gap-4">
          <Input.Root id="product-name" error={null} className="lg:max-w-lg">
            <Input.Label>Product Name:</Input.Label>
            <Input
              required
              value={productName}
              name="product_name"
              placeholder="Name of product"
              onChange={({ target: { value } }) => setProductName(value)}
            />
          </Input.Root>

          <div className="lg:w-[32rem]">
            <ImageDropzone
              id="product-image"
              className="rounded-md border-2 border-dashed border-gray-400 max-h-64"
              onFileUpload={setProductImage}
              defaultValue={product?.image}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Input.Root id="product-price" error={null} className="lg:max-w-lg">
            <Input.Label>Product Price:</Input.Label>
            <CurrencyInput
              required
              id="product-price"
              currency="R$"
              maxLength={6}
              onChange={setProductPrice}
              defaultValue={productPrice}
            />
          </Input.Root>
          <div className="flex flex-col gap-2">
            <Input.Root id="product-menu" error={null} className="w-full">
              <Input.Label>Product menu:</Input.Label>
              <Select
                options={menus.map(({ id, menuName }) => ({
                  value: id,
                  label: menuName,
                }))}
                id="product-menus"
                required
                defaultValue={selectedMenus.map((v) => ({ label: v.name, value: v.id }))}
                onChange={(values) =>
                  setSelectedMenus(values.map((v) => ({ id: v.value, name: v.label })))
                }
              />
            </Input.Root>
            <Input.Root id="product-type" error={null} className="w-full">
              <Input.Label>Product menu:</Input.Label>
              <Select
                id="product-types"
                options={menus
                  .filter((menu) => selectedMenus.some(({ id }) => id === menu.id))
                  .map((menu) =>
                    menu.productTypes.map(({ id, type }) => ({ value: id, label: type })),
                  )
                  .flat(1)}
                required
                defaultValue={selectedTypes.map((v) => ({ label: v.name, value: v.id }))}
                disabled={!selectedMenus.length}
                onChange={(values) =>
                  setSelectedTypes(values.map((v) => ({ id: v.value, name: v.label })))
                }
              />
            </Input.Root>
          </div>
        </div>
      </div>

      <Input.Root
        id="product-description"
        error={null}
        className="w-full h-60 lg:max-w-[32rem]"
      >
        <Input.Label>Product Description:</Input.Label>
        <Editor
          defaultValue={productDesc}
          id="product-description"
          placeholder="Project description here..."
          onChange={(htmlValue) => {
            setProductDesc(htmlValue);
          }}
        />
      </Input.Root>

      <Button type="submit" loading={loading} className="gap-2 py-4">
        <span>{!!product ? 'Edit' : 'Create'} product</span>
        <BookmarkFilledIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};
