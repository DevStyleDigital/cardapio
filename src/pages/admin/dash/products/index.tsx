import type { Product } from 'types/product';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Table } from '@web/components/Table';
import { http } from '@web/services/http';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TableActions } from '@web/components/Table/TableActions';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Order } from '@web/components/Pages/Dash/Products/Order';
import { Menu } from 'types/menu';

const RowActions = (props: Product & { onDelete: () => void }) => {
  const router = useRouter();

  return (
    <TableActions
      onClickDelete={async () => {
        if (
          confirm(
            "Did you really want remove this item?\n\nThis action can't be reverse!",
          )
        ) {
          await http
            .delete(`/api/products/${props.id}`)
            .then(() => {
              props.onDelete();
              toast.success('Product deleted successful!');
            })
            .catch((err) =>
              toast.error(err.message, { toastId: `r:dash-products-${err.type}` }),
            );
        }
      }}
      onClickEdit={() => router.push(`/admin/dash/products/${props.id}`)}
    />
  );
};

const Menu = ({ products, menus }: { products: Product[]; menus: Menu[] }) => {
  const [productsData, setProducts] = useState(products);
  return (
    <main className="bg-gray-200 w-full h-auto overflow-auto">
      <div className="my-16 mb-8 px-8 gap-4 flex flex-col">
        <h1 className="title">Product:</h1>
        <div className="w-fit flex flex-col gap-4">
          <Button asChild className="gap-4">
            <Link href="/admin/dash/products/create">
              <span>Create new product</span>
              <PlusIcon className="w-6 h-6 pointer-events-none" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="bg-gray-300/40 w-full 2xl:h-[70vh] items-center flex max-md:p-4 p-8 max-2xl:flex-col">
        <Table
          columns={[
            {
              field: 'id',
              headerName: 'ID',
              width: 280,
              disableColumnMenu: true,
              sortable: false,
            },
            { field: 'name', headerName: 'Nome', width: 300 },
            { field: 'price', headerName: 'Preço (R$)', width: 120 },
            { field: 'visibility', headerName: 'Visibilidade', width: 100 },
          ]}
          rows={productsData.map((product) => ({
            ...product,
            visibility: product.visibility === 'block' ? 'Active' : 'Disable',
          }))}
          className="2xl:w-1/2 w-full max-2xl:mb-10 h-[60vh]"
          rowActions={(params) => (
            <RowActions
              {...params}
              onDelete={() =>
                setProducts((prev) => prev.filter(({ id }) => params.id !== id))
              }
            />
          )}
        />
        <Order products={products} menus={menus} />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const menus = await http
    .get('/api/menu')
    .then((res) => res)
    .catch(() => []);

  const products = await http
    .get('/api/products/dash')
    .then((res) => res)
    .catch(() => []);

  return {
    props: {
      products: products,
      menus: menus,
    },
  };
};

export default Menu;
