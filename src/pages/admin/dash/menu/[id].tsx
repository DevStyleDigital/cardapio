import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Menu, ProductType } from 'types/menu';

import { Form } from '@web/components/Pages/Dash/Menu/Form';
import { http } from '@web/services/http';

const MenuForm = ({
  menu,
  productTypeDb,
}: {
  menu: Menu | null;
  productTypeDb: ProductType[];
}) => {
  return (
    <main className="bg-gray-200 w-full">
      <h1 className="title ml-8 mt-16 mb-8">Menu:</h1>
      <Form menu={menu || undefined} productTypeDb={productTypeDb} />
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const menus = await http
    .get<{ id: string }[]>('/api/menu/ids')
    .then((res) => res)
    .catch(() => []);
  return {
    paths: [{ params: { id: 'create' } }].concat(
      menus.map(({ id }) => ({ params: { id } })),
    ),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let menu = null;
  if (params?.id !== 'create')
    menu = await http
      .get(`/api/menu/${params?.id}`)
      .then((res) => res)
      .catch(() => null);

  console.log(menu);

  return {
    props: {
      menu: menu,
      productTypeDb: (menu as any)?.productTypes || [],
    },
  };
};

export default MenuForm;
