import type { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id === 'create')
    return {
      props: {
        menu: null,
        productTypeDb: [],
      },
    };

  const menu = await http
    .get(`/api/menu/${params?.id}`)
    .then((res) => res)
    .catch(() => null);

  if (!menu)
    return {
      notFound: true,
    };

  return {
    props: {
      menu: menu,
      productTypeDb: (menu as any)?.productTypes || [],
    },
  };
};

export default MenuForm;
