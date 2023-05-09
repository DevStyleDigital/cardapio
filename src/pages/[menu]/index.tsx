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
import { useEffect, useState } from 'react';
import type { Menu } from 'types/menu';

const Menu = ({ id }: any) => {
  const { sidebarOpen } = useSideBar();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Menu>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await http
        .get<Menu>(`/api/menu/${id}`)
        .then((res) => res)
        .catch((error) => null);
      if (!response) {
        router.push('/');
      } else {
        setLoading(false);
        setData(response);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section
      className={clsx(
        'w-full h-auto bg-fundo-400 flex flex-col justify-between xl:items-center',
        { 'h-screen overflow-hidden': sidebarOpen },
      )}
    >
      <HeaderBanner
        text={data?.menuName!}
        responser={data?.menuResponser!}
        url={data?.menuImage!}
      />
      <div className="w-full h-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:max-w-[1300px] gap-6 p-6">
        {data?.productTypes?.sort((a, b) => a.type.localeCompare(b.type)).map((item: any) => {
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
      <div className="w-full flex justify-center px-6 pb-6 h-[13rem] md:h-[15rem] xl:h-[18rem]">
        <BlurImage
          className="w-full h-full max-w-[550px] xl:max-w-[600px]"
          src={data?.menuAdvertiser}
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

  return {
    props: {
      id,
    },
  };
};

export default Menu;
