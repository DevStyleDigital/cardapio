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
import { mergeArrays } from '@web/utils/merge-arrays';

export const Form = ({ menu }: { menu?: Menu }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuName, setMenuName] = useState(menu?.menuName || '');
  const [menuResponser, setMenuResponser] = useState(menu?.menuResponser || '');
  const [menuImage, setMenuImage] = useState<File | null>();
  const [menuAdvertiser, setAdvertiser] = useState<File | null>();
  const [productTypes, setProductTypes] = useState<ProductType[]>(
    menu?.productTypes || [],
  );
  const [productTypesDeleted, setProductTypesDeleted] = useState<string[]>([]);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);
    let error;

    const formData = new FormData();
    productTypes.forEach((productType) => {
      if (!!menu) {
        productType.images?.advertiser &&
          formData.append(
            `productTypes-advertiser-${productType.id}`,
            productType.images.advertiser,
            'advertiser',
          );
        productType.images?.image &&
          formData.append(
            `productTypes-image-${productType.id}`,
            productType.images.image,
            'image',
          );
        return;
      }

      if (!productType.images?.advertiser || !productType.images?.image)
        error = 'Some fields in product type are not filed';
      else {
        formData.append(
          `productTypes-advertiser-${productType.id}`,
          productType.images.advertiser,
          'advertiser',
        );
        formData.append(
          `productTypes-image-${productType.id}`,
          productType.images.image,
          'image',
        );
      }
    });

    if (error) return toast.error(error);
    menuName !== menu?.menuName && formData.append('menuName', menuName);
    menuResponser !== menu?.menuResponser &&
      formData.append('menuResponser', menuResponser);
    formData.append('productTypesDeleted', JSON.stringify(productTypesDeleted));
    menuImage && formData.append('menuImage', menuImage, 'menuImage');
    menuAdvertiser && formData.append('menuAdvertiser', menuAdvertiser, 'menuAdvertiser');

    const productTypesFormatted = productTypes.map((productType) => ({
      id: productType.id,
      type: productType.type,
    }));
    productTypesFormatted.length &&
      formData.append(
        'productTypes',
        JSON.stringify(
          !!menu
            ? mergeArrays(menu.productTypes, productTypesFormatted, ['type'])
            : productTypesFormatted,
        ),
      );

    http[!!menu ? 'patch' : 'post'](`/api/menu/${!!menu ? menu?.id : ''}`, formData, {
      headers: { 'content-type': 'application/x-www-form-urlencode' },
    })
      .then((res) => {
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
        <Input.Label>Menu Name*:</Input.Label>
        <Input
          required
          value={menuName}
          name="menu_name"
          placeholder="Name of menu"
          onChange={({ target: { value } }) => setMenuName(value)}
        />
      </Input.Root>
      <Input.Root id="menu-responser" error={null} className="max-w-lg">
        <Input.Label>Menu responser:</Input.Label>
        <Input
          value={menuResponser}
          name="menu_responser"
          placeholder="Name of responser"
          onChange={({ target: { value } }) => setMenuResponser(value)}
        />
      </Input.Root>

      <Input.Root id="menu-image" error={null}>
        <Input.Label>Menu image*:</Input.Label>
        <Banner.Root className="rounded-md border-2 border-dashed border-gray-400 max-h-64">
          <ImageDropzone
            required
            id="menu-image"
            className="border-none"
            onFileUpload={setMenuImage}
            defaultValue={menu?.menuImage}
          />
          {menuImage && (
            <Banner.Text className="pointer-events-none">{menuName}</Banner.Text>
          )}
        </Banner.Root>
      </Input.Root>
      <Input.Root id="menu-advertiser-image" error={null} className="lg:max-w-lg">
        <Input.Label>Menu advertiser*:</Input.Label>
        <ImageDropzone
          required
          id="menu-advertiser-image"
          className="px-8 max-h-60"
          defaultValue={menu?.menuAdvertiser}
          onFileUpload={setAdvertiser}
        />
      </Input.Root>

      <ProductTypes
        onChange={setProductTypes}
        onDelete={(ev) => !!menu && setProductTypesDeleted(ev)}
        defaultValue={productTypes}
      />

      <Button type="submit" loading={loading} className="gap-2 py-4">
        <span>Create menu</span>
        <BookmarkFilledIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};
