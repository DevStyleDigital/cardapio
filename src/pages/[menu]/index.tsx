import MenuItem from '@web/components/Pages/Cardapio/Menu';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import { MenuItens } from '@web/utils/menu';
import { GetServerSideProps } from 'next';

const Menu = ({ menu }: any) => {
  const MenuFilter = MenuItens.filter((item) => item.link === menu);
  return (
    <section className="w-full bg-fundo-400 flex flex-col justify-between gap-6">
      <HeaderBanner />
      <div className="w-full h-auto grid grid-cols-2 gap-6 p-10">
        {MenuFilter.map((menuItem) => {
          return menuItem?.menu?.map((item) => {
            return (
              <MenuItem key={item.id} menu={menu} link={item.link} nome={item.name} />
            );
          });
        })}
      </div>
      <div className="w-full h-40 p-6">
        <div className=" w-full h-full bg-white"></div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const menu = context?.params?.menu;
  return {
    props: {
      menu,
    },
  };
};

export default Menu;
