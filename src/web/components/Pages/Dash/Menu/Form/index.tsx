import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { ProductTypes } from './components/ProductTypes';
import { Banner } from '@web/components/Banner';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import React, { useState } from 'react';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import type { Menu, ProductType } from 'types/menu';

export const Form = ({ menu }: { menu?: Menu }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuName, setMenuName] = useState(menu?.menuName || '');
  const [menuImage, setMenuImage] = useState<File | undefined>();
  const [productTypes, setProductTypes] = useState<ProductType[]>(
    menu?.productTypes || [],
  );

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('menuName', menuName);
    formData.append('menuImage', menuImage!);
    formData.append('productTypes', JSON.stringify(productTypes));

    http
      .post('/api/menu', formData, {
        headers: { 'content-type': 'application/x-www-form-urlencode' },
      })
      .then(() => {
        toast.success('Menu created!');
        router.push('/admin/dash/menu');
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
      <Input.Root id="menu-name" error={null} className="max-w-lg">
        <Input.Label>Menu Name:</Input.Label>
        <Input
          required
          value={menuName}
          name="menu_name"
          placeholder="Name of menu"
          onChange={({ target: { value } }) => setMenuName(value)}
        />
      </Input.Root>

      <Banner.Root className="rounded-md border-2 border-dashed border-gray-400 max-h-64">
        <ImageDropzone
          className="border-none"
          onFileUpload={setMenuImage}
          defaultValue={menu?.menuImage}
        />
        {menuImage && (
          <Banner.Text className="pointer-events-none">{menuName}</Banner.Text>
        )}
      </Banner.Root>

      <ProductTypes onChange={setProductTypes} defaultValue={productTypes} />

      <Button type="submit" loading={loading} className="gap-2 py-4">
        <span>Create menu</span>
        <BookmarkFilledIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};
