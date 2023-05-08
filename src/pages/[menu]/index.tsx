import MenuItem from '@web/components/Pages/Cardapio/Menu';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import { useSideBar } from '@web/components/Pages/Cardapio/sidebar';
import BlurImage from '@web/components/imageBlur';
import { getCookie } from '@web/services/cookies';
import { http } from '@web/services/http';
import { MenuItens } from '@web/utils/menu';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import type { Menu } from 'types/menu';

const Menu = ({ menus }: any) => {
  const { sidebarOpen } = useSideBar();
  const { id, menuName, menuAdvertiser, menuImage, productTypes, menuResponser } = menus;
  return (
    <section className={clsx("w-full h-auto bg-fundo-400 flex flex-col justify-between xl:items-center", {'h-screen': sidebarOpen})}>
      <HeaderBanner text={menuName} responser={menuResponser} url={menuImage} />
      <div className="w-full h-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:max-w-[1300px] gap-6 p-6">
        {productTypes?.map((item: any) => {
          return (
            <MenuItem
              key={item.id}
              menu={id}
              link={item.id}
              nome={item.type}
              img={item.images.image}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center px-6 pb-6 h-[11rem] md:h-[15rem] xl:h-[18rem]">
        <BlurImage
          className="w-full h-full max-w-[550px] xl:max-w-[600px] shadow-lg shadow-black/90"
          src={menuAdvertiser}
          width={1000}
          height={500}
        />
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = getCookie(context, '_CODE_VALID');
  if (!cookies) {
    return {
      redirect: {
        destination: '/code',
        permanent: false,
      },
    };
  }
  const id = context?.params?.menu;
  const menus = await http
    .get<Menu[]>(`/api/menu/${id}`)
    .then((res) => res)
    .catch((error) => null);

  if (!menus) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  return {
    props: {
      menus,
    },
  };
};

export default Menu;
