import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { Menu as MenuComp } from '@web/components/Pages/Dash/Menu/Menu';
import { http } from '@web/services/http';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import type { Menu } from 'types/menu';

const Menu = ({ menus }: { menus: Menu[] }) => {
  return (
    <main className="bg-gray-200 w-full">
      <div className="my-16 px-8 gap-4 flex flex-col">
        <h1 className="title">Menu:</h1>
        <div className="w-fit">
          <Button asChild className="gap-4">
            <Link href="/admin/dash/menu/create">
              <span>Create new Menu</span>
              <PlusIcon className="w-6 h-6 pointer-events-none" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="bg-gray-300/20 grid md:grid-cols-2 gap-8 p-8">
        {menus.map(({ id, menuImage, menuName }) => (
          <MenuComp alt="" key={id} id={id} text={menuName} url={menuImage} />
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const menus = await http
    .get<Menu[]>('/api/menu')
    .then((res) => res)
    .catch(() => []);

  return {
    props: { menus },
  };
};

export default Menu;
