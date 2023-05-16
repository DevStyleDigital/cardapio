import Loading from '@web/components/Loading';
import MenuItem from '@web/components/Pages/Cardapio/Menu';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import { useSideBar } from '@web/components/Pages/Cardapio/sidebar';
import BlurImage from '@web/components/imageBlur';
import { getCookie } from '@web/services/cookies';
import { http } from '@web/services/http';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { Menu } from 'types/menu';
import useSWR from 'swr';

const Menu = ({ id }: any) => {
  const { sidebarOpen } = useSideBar();
  const { data, error, isLoading } = useSWR<Menu>(`/api/menu/${id}`, http.get);

  const router = useRouter();

  useEffect(() => {
    if ((!data && !isLoading) || error) router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <section
      className={clsx(
        'w-full h-auto bg-fundo-400 flex flex-col justify-between xl:items-center',
        { 'h-screen overflow-hidden': sidebarOpen },
      )}
    >
      <div className="w-full flex flex-col xl:items-center">
        <HeaderBanner
          text={data?.menuName!}
          responser={data?.menuResponser!}
          url={data?.menuImage!}
        />
        <div className="w-full h-auto grid grid-cols-2 place-items-center md:grid-cols-4 lg:grid-cols-5 xl:max-w-[1300px] gap-6 p-6">
          {data?.productTypes
            ?.sort((a, b) => a.type.localeCompare(b.type))
            .map((item: any) => {
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
      </div>
      {data?.menuAdvertiser && (
        <div className="w-full flex justify-center px-6 pb-6 h-auto">
          <BlurImage
            className="w-full h-full max-w-[550px] xl:max-w-[600px]"
            src={data?.menuAdvertiser}
            width={1000}
            height={500}
          />
        </div>
      )}
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

  return {
    props: {
      id,
    },
  };
};

export default Menu;
