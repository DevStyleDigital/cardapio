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
import useSWR from 'swr';
import { Menu } from 'types/menu';
import { Product } from 'types/product';

const TypeMenu = ({ type, menus }: any) => {
  const { sidebarOpen } = useSideBar();
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useSWR<Product[]>(
    `/api/products?menu=${menus.id}&type=${type.id}`,
    http.get,
  );
  const [productsData, setProductcsData] = useState<Product[]>([]);
  const router = useRouter();
  const TypeFormated = router?.query?.nome;

  useEffect(() => {
    if (data && data.filter(({ visibility }) => visibility === 'block')?.length) {
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
      });
      setLoading(false);
    } else if (!isLoading) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading]);

  if (loading || isLoading) {
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
          {productsData
            ?.sort((a, b) => (a as any).name.localeCompare((b as any).name))
            .filter(({ visibility }) => visibility === 'block')
            .map((produto: any, index: number) => {
              return (
                <>
                  <ProdutosContent
                    key={produto.id}
                    nome={produto.name}
                    img={produto.image}
                    descricao={produto.text}
                    preco={produto.price.replace('.', ',')}
                  />
                  {produto.anunciante && type?.images.advertiser && (
                    <div className="w-full h-auto p-6 lg:hidden">
                      <div className="w-full h-full md:h-[15rem] bg-golden-400">
                        <Image
                          className="w-full h-full"
                          src={type.images.advertiser}
                          width={1000}
                          height={500}
                          alt="banner-anunciante"
                        />
                      </div>
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
  const type = context?.params?.type;

  const menus = await http
    .get<Menu>(`/api/menu/${menu}`)
    .then((res) => res)
    .catch(() => null);

  const menuProductType = menus?.productTypes?.filter(({ id }) => `${id}` === type)[0];

  if (!menus || !menuProductType) {
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
      type: menuProductType,
    },
  };
};

export default TypeMenu;
