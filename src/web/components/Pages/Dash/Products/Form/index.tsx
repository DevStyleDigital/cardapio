import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import React, { useState } from 'react';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import type { Product } from 'types/product';
import { CurrencyInput } from '@web/components/CurrencyInput';

export const Form = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState(product?.name || '');
  const [productImage, setProductImage] = useState<File | undefined>();

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('productImage', productImage!);

    http
      .post('/api/product', formData, {
        headers: { 'content-type': 'application/x-www-form-urlencode' },
      })
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
      <div className="flex flex-wrap gap-20">
        <div className="flex flex-col gap-4">
          <Input.Root id="product-name" error={null} className="max-w-lg">
            <Input.Label>Product Name:</Input.Label>
            <Input
              required
              value={productName}
              name="product_name"
              placeholder="Name of product"
              onChange={({ target: { value } }) => setProductName(value)}
            />
          </Input.Root>

          <div className="max-h-56 w-[32rem]">
            <ImageDropzone onFileUpload={setProductImage} defaultValue={product?.image} />
          </div>
        </div>
        <div className="mt-10">
          <CurrencyInput onChange={() => {}} defaultValue={undefined} />
        </div>
      </div>
      <Button type="submit" loading={loading} className="gap-2 py-4">
        <span>Create product</span>
        <BookmarkFilledIcon className="w-5 h-5" />
      </Button>
    </form>
  );
};
