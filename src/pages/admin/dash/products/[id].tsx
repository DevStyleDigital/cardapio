import type { GetStaticPaths, GetStaticProps } from 'next';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await http
    .get<{ id: string }[]>('/api/product/ids')
    .then((res) => res)
    .catch(() => []);

  return {
    paths: [{ params: { id: 'create' } }].concat(
      products.map(({ id }) => ({ params: { id } })),
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let product = null;
  if (params?.id !== 'create')
    product = await http
      .get(`/api/product/${params?.id}`)
      .then((res) => res)
      .catch(() => null);

  const menus = await http
    .get('/api/menu')
    .then((res) => res)
    .catch(() => []);

  return {
    props: {
      product: product,
      menus: menus,
    },
  };
};

export default ProductForm;
