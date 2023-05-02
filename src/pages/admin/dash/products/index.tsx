import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Table } from '@web/components/Table';
import Link from 'next/link';

const Menu = () => {
  return (
    <main className="bg-gray-200 w-full h-auto">
      <div className="my-16 px-8 gap-4 flex flex-col">
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
      <div className="bg-gray-300/20 w-full h-fit flex p-8">
        <Table columns={[]} rows={[]} className="w-full h-96" />
      </div>
    </main>
  );
};

export default Menu;
