import type { Product } from 'types/product';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Table } from '@web/components/Table';
import { http } from '@web/services/http';
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TableActions } from '@web/components/Table/TableActions';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

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

const Menu = ({ products }: { products: Product[] }) => {
  const [productsData, setProducts] = useState(products);
  return (
    <main className="bg-gray-200 w-full h-auto">
      <div className="my-16 mb-8 px-8 gap-4 flex flex-col">
        <h1 className="title">Product:</h1>
        <div className="w-fit">
          <Button asChild className="gap-4">
            <Link href="/admin/dash/products/create">
              <span>Create new product</span>
              <PlusIcon className="w-6 h-6 pointer-events-none" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="bg-gray-300/40 w-full h-fit flex p-8">
        <Table
          columns={[
            { field: 'id', headerName: 'ID', width: 120 },
            { field: 'name', headerName: 'Name', width: 220 },
            { field: 'price', headerName: 'Price', width: 220 },
          ]}
          rows={productsData}
          className="w-full h-96"
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
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await http
    .get('/api/products/dash')
    .then((res) => res)
    .catch(() => []);

  return {
    props: {
      products: products,
    },
  };
};

export default Menu;
