import BackButton from '@web/components/Button/back';
import Loading from '@web/components/Loading';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import { useSideBar } from '@web/components/Pages/Cardapio/sidebar';
import ProdutosContent from '@web/components/produtos';
import { getCookie } from '@web/services/cookies';
import { http } from '@web/services/http';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Menu } from 'types/menu';

const TypeMenu = ({ type, menus }: any) => {
  const { sidebarOpen } = useSideBar();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [productsData, setProductcsData] = useState([]);
  const router = useRouter();
  const TypeFormated = router?.query?.nome;

  useEffect(() => {
    async function fetchData() {
      const response = await http
        .get(`/api/products/dash`)
        .then((res) => res)
        .catch((err) => err);
      if (!response) {
        router.push('/');
      } else {
        setLoading(false);
        setData(response);
      }
    }
    fetchData();
  }, [type]);

  
  useEffect(() => {
    if(data?.length){
    setProductcsData(() => {
      const newProduct = data?.map((product: any) => ({
        ...product,
        anunciante: false,
      }));
      if (data?.length > 5) {
        newProduct[4].anunciante = true;
      } else {
        newProduct[data?.length - 1].anunciante = true;
      }
      return newProduct;
    })
  }
  },[data])


  if (loading) {
    return <Loading />;
  }

  return (
    <section
      className={clsx('w-full h-auto bg-fundo-400 flex flex-col xl:items-center', {
        'h-screen overflow-hidden': sidebarOpen,
      })}
    >
      <HeaderBanner
        responser={menus.menuResponser}
        text={menus.menuName}
        url={menus.menuImage}
      />
      <div className="xl:max-w-[1300px] w-full flex flex-col p-6">
        <h1 className="text-md tracking-4 uppercase pb-0 text-red-600 self-start">
          {TypeFormated}
        </h1>
        <BackButton menuPath={menus} />
        <div className="w-full h-auto flex flex-col lg:grid lg:grid-cols-3 gap-6 pb-24">
          {productsData?.map((produto: any, index: number) => {
            return (
              <>
                <ProdutosContent
                  key={produto.id}
                  nome={produto.name}
                  img={produto.image}
                  descricao={produto.text}
                  preco={produto.price}
                />
                {produto.anunciante && (
                  <div className="w-full h-auto p-6 lg:hidden">
                    {type?.images.advertiser && (
                      <div className="w-full h-full md:h-[15rem] bg-golden-400">
                        <Image
                          className="w-full h-full"
                          src={type.images.advertiser}
                          width={1000}
                          height={500}
                          alt="banner-anunciante"
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            );
          })}
        </div>
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

  const menu = context?.params?.menu;

  const menus = await http
    .get<Menu>(`/api/menu/${menu}`)
    .then((res) => res)
    .catch(() => null);

    
  const MenuType = menus?.productTypes.filter(
    (item) => item.id === context?.params?.type,
  );

  if (!MenuType?.length) {
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
      type: MenuType?.[0],
    },
  };
};

export default TypeMenu;
