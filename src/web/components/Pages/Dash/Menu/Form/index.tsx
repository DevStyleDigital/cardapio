import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { ProductTypes } from './components/ProductTypes';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import type { Menu, ProductType } from 'types/menu';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { mergeArrays } from '@web/utils/merge-arrays';

export const Form = ({
  menu,
  productTypeDb,
}: {
  menu?: Menu;
  productTypeDb: ProductType[];
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [menuName, setMenuName] = useState(menu?.menuName || '');
  const [menuResponser, setMenuResponser] = useState(menu?.menuResponser || '');
  const [menuImage, setMenuImage] = useState<File | null>(null);
  const [menuAdvertiser, setAdvertiser] = useState<File | null>(null);
  const [productTypes, setProductTypes] = useState<ProductType[]>(
    menu?.productTypes ? [...menu?.productTypes] : [],
  );
  const [productTypesDeleted, setProductTypesDeleted] = useState<string[]>([]);

  async function submitImage(
    validDelete: boolean,
    key: string,
    filepath: string,
    file: any,
    route?: string,
  ) {
    const formData = new FormData();
    formData.append('path', filepath);

    let makeFetch;
    if (!file && validDelete) {
      formData.append(key, 'delete');
      makeFetch = true;
    } else if (
      !!file &&
      file?.name !== 'default-image.webp' &&
      typeof file !== 'string'
    ) {
      makeFetch = true;
      formData.append(key, file, key);
    }
    makeFetch &&
      (await http[!!menu ? 'patch' : 'post'](
        route || `/api/menu/${filepath.split('/')[0]}/upload`,
        formData,
        { headers: { 'content-type': 'application/x-www-form-urlencode' } },
      ).catch(() => toast.error('Ocurred an error on submit a few images!')));
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);
    const menuData = {
      menuName: menuName === menu?.menuName ? undefined : menuName,
      menuResponser: menuResponser === menu?.menuResponser ? undefined : menuResponser,
    };

    const productTypesFormatted = productTypes.map((productType) => ({
      id: productType.id,
      type: productType.type,
    }));

    const productsTypes = !!menu
      ? mergeArrays(
          productTypesFormatted,
          productTypeDb.filter(({ id }) => !productTypesDeleted.includes(id)),
          ['type'],
        )
      : productTypesFormatted;

    http[!!menu ? 'patch' : 'post']<{ id: string }>(
      `/api/menu/${!!menu ? menu.id : ''}`,
      menuData,
    )
      .then(async (res) => {
        await submitImage(
          !!menu?.menuImage,
          'menuImage',
          `${res.id}/image.webp`,
          menuImage,
        );
        await submitImage(
          !!menu?.menuAdvertiser,
          'menuAdvertiser',
          `${res.id}/advertiser.webp`,
          menuAdvertiser,
        );

        productTypesDeleted.length &&
          (await http.post('/api/product-type/delete', { productTypesDeleted }));
        await Promise.all(
          productsTypes.map(async (productType) => {
            await http[!!menu ? 'patch' : 'post'](`/api/product-type/${productType.id}`, {
              type: productType.type,
              menuId: res.id,
            }).catch((err) => toast.error(err.message));
          }),
        );
        await Promise.all(
          productTypes.map(async ({ id, images }) => {
            await submitImage(
              true,
              'image',
              `${res.id}/product-type/${id}/image.webp`,
              images?.image,
              `/api/product-type/${id}/upload`,
            );
            await submitImage(
              true,
              'advertiser',
              `${res.id}/product-type/${id}/advertiser.webp`,
              images?.advertiser,
              `/api/product-type/${id}/upload`,
            );
          }),
        );
        toast.success(!!menu ? 'Menu edited!' : 'Menu created!');
        return res;
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(async () => {
        await router.push('/admin/dash/menu');
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
        <div>
          <ImageDropzone
            required
            id="menu-image"
            className="rounded-md border-2 border-dashed border-gray-400 max-h-64"
            onFileUpload={setMenuImage}
            defaultValue={
              menuImage === undefined
                ? undefined
                : menuImage || (menu?.menuImage && `${menu?.menuImage}?v=${Date.now()}`)
            }
          />
        </div>
      </Input.Root>
      <Input.Root id="menu-advertiser-image" error={null} className="lg:max-w-lg">
        <Input.Label>Menu advertiser:</Input.Label>
        <ImageDropzone
          id="menu-advertiser-image"
          className="px-8 max-h-60"
          defaultValue={
            menuAdvertiser === undefined
              ? undefined
              : menuAdvertiser ||
                (menu?.menuAdvertiser && `${menu?.menuAdvertiser}?v=${Date.now()}`)
          }
          onFileUpload={setAdvertiser}
        />
      </Input.Root>

      <ProductTypes
        defaultValue={menu?.productTypes}
        onChange={setProductTypes}
        onDelete={(ev) => !!menu && setProductTypesDeleted(ev)}
        value={productTypes.map((productType) => ({
          ...productType,
          images: {
            advertiser:
              productType.images?.advertiser &&
              typeof productType.images?.advertiser === 'string'
                ? `${productType.images?.advertiser}?v=${Date.now()}`
                : productType.images?.advertiser,
            image:
              productType.images?.image && typeof productType.images?.image === 'string'
                ? `${productType.images?.image}?v=${Date.now()}`
                : productType.images?.image,
          },
        }))}
      />

      <Button type="submit" loading={loading} className="gap-2 py-4">
        <span>{!!menu ? 'Edit' : 'Create'} menu</span>
        <BookmarkFilledIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};
