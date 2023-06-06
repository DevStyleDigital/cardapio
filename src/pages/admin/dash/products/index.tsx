import type { Product } from 'types/product';
import { DrawingPinFilledIcon, PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Table } from '@web/components/Table';
import { http } from '@web/services/http';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TableActions } from '@web/components/Table/TableActions';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Modal } from '@web/components/Modal';
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
    <Modal.Root id="products-order">
      <Order products={products} menus={menus} />
      <main className="bg-gray-200 w-full h-auto">
        <div className="my-16 mb-8 px-8 gap-4 flex flex-col">
          <h1 className="title">Product:</h1>
          <div className="w-fit flex flex-col gap-4">
            <Button asChild className="gap-4">
              <Link href="/admin/dash/products/create">
                <span>Create new product</span>
                <PlusIcon className="w-6 h-6 pointer-events-none" />
              </Link>
            </Button>
            <Modal.Trigger asChild>
              <Button className="gap-4 bg-white !text-primary-400 hover:bg-slate-100 ">
                <span>Edit products order</span>
                <DrawingPinFilledIcon className="w-6 h-6 pointer-events-none" />
              </Button>
            </Modal.Trigger>
          </div>
        </div>
        <div className="bg-gray-300/40 w-full h-fit flex p-8">
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
            className="w-full h-[60vh]"
            rowActions={(params) => (
              <RowActions
                {...params}
                onDelete={() =>
                  setProducts((prev) => prev.filter(({ id }) => params.id !== id))
                }
              />
            )}
          />
        </div>
      </main>
    </Modal.Root>
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
