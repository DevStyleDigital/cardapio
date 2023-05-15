import {
  DrawingPinFilledIcon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Menu as MenuComp } from '@web/components/Pages/Dash/Menu/Menu';
import { http } from '@web/services/http';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { Menu } from 'types/menu';

const Menu = ({ menus }: { menus: Menu[] }) => {
  const [menusData, setMenus] = useState(menus);
  const [menusOrder, setMenusOrder] = useState<string[] | undefined>();
  const [menusOrderLoading, setMenusOrderLoading] = useState(false);

  function handleMenuOrder() {
    if (menusData.length !== menusOrder?.length)
      return toast.warn('You need click in all cards first!');
    setMenusOrderLoading(true);

    http
      .patch('/api/menus-order', { menusOrder })
      .then(() => toast.success('Order updated!'))
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setMenusOrderLoading(false);
        setMenusOrder(undefined);
      });
  }

  return (
    <main className="bg-gray-200 w-full">
      <div className="mt-16 mb-2 px-8 gap-4 flex flex-col">
        <h1 className="title">Menu:</h1>
        <div className="w-fit">
          <Button asChild className="gap-4">
            <Link href="/admin/dash/menu/create">
              <span>Create new Menu</span>
              <PlusIcon className="w-6 h-6 pointer-events-none" />
            </Link>
          </Button>
        </div>
        <div className="w-fit">
          <Button
            className="gap-4 bg-white !text-primary-400 hover:bg-slate-100"
            loading={!!menusOrder}
            onClick={() => setMenusOrder([])}
          >
            <span>Edit menu order</span>
            <DrawingPinFilledIcon className="w-6 h-6 pointer-events-none" />
          </Button>
        </div>
      </div>
      {!!menusOrder && (
        <div className="fixed bottom-4 z-50 flex gap-4 left-1/2">
          <Button className="gap-4" loading={menusOrderLoading} onClick={handleMenuOrder}>
            <span>Save</span>
            <Pencil2Icon className="w-6 h-6 pointer-events-none" />
          </Button>
          <Button
            className="gap-4"
            disabled={menusOrderLoading}
            onClick={() => setMenusOrder(undefined)}
          >
            <span>Cancelar</span>
            <TrashIcon className="w-6 h-6 pointer-events-none" />
          </Button>
        </div>
      )}
      <div className="bg-gray-300/20 grid md:grid-cols-2 gap-8 p-8">
        {menusData.map(({ id, menuImage, menuName }, i) => (
          <div
            key={id}
            className="relative"
            onClick={() =>
              !!menusOrder &&
              setMenusOrder((prev) => {
                if (prev?.[prev!.length - 1] === id) return prev;
                return [...prev!, id];
              })
            }
          >
            <div
              className={clsx({
                'pointer-events-none': !!menusOrder,
              })}
            >
              <MenuComp
                alt=""
                id={id}
                text={menuName}
                url={menuImage}
                onDelete={() => {
                  setMenus((prev) => {
                    const newPrev = [...prev];
                    newPrev.splice(i, 1);
                    return newPrev;
                  });
                }}
              />
            </div>
            <span
              className={clsx(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-4xl w-16 h-16 rounded-full flex items-center justify-center',
                {
                  hidden: !menusOrder,
                },
              )}
            >
              {(menusOrder?.indexOf(id) || 0) + 1}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const menus = await http
    .get<Menu[]>('/api/menu/')
    .then((res) => {
      return res;
    })
    .catch(() => []);

  return {
    props: { menus },
  };
};

export default Menu;
