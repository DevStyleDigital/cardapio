import type { GetServerSideProps } from 'next';
import type { Product } from 'types/product';
import { Menu } from 'types/menu';

import { Form } from '@web/components/Pages/Dash/Products/Form';
import { http } from '@web/services/http';

const ProductForm = ({ product, menus }: { product: Product; menus: Menu[] }) => {
  return (
    <main className="bg-gray-200 w-full">
      <h1 className="title ml-8 mt-16 mb-8">Product:</h1>
      <Form product={product} menus={menus} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const menus = await http
    .get('/api/menu')
    .then((res) => res)
    .catch(() => []);

  if (params?.id === 'create')
    return {
      props: {
        product: null,
        menus: menus,
      },
    };

  const product = await http
    .get(`/api/products/${params?.id}`)
    .then((res) => res)
    .catch(() => null);

  if (!product)
    return {
      notFound: true,
    };

  return {
    props: {
      product: product,
      menus: menus,
    },
  };
};

export default ProductForm;
