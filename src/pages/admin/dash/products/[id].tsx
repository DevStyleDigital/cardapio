import type { GetStaticPaths, GetStaticProps } from 'next';
// import type { Product } from 'types/product';

import { Form } from '@web/components/Pages/Dash/Products/Form';
import { http } from '@web/services/http';

const ProductForm = ({ product }: { product: null }) => {
  return (
    <main className="bg-gray-200 w-full">
      <h1 className="title ml-8 mt-16 mb-8">Product:</h1>
      <Form product={undefined} />
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const products = await http
  //   .get<{ id: string }[]>('/api/product/ids')
  //   .then((res) => res)
  //   .catch(() => []);

  return {
    paths: [{ params: { id: 'create' } }].concat(
      // products.map(({ id }) => ({ params: { id } })),
      [],
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // let product = null;
  // if (params?.id !== 'create')
  //   product = await http
  //     .get(`/api/product/${params?.id}`)
  //     .then((res) => res)
  //     .catch(() => null);

  return {
    props: {
      product: 'product',
    },
  };
};

export default ProductForm;
