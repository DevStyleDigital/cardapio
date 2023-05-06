import BackButton from '@web/components/Button/back';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import ProdutosContent from '@web/components/produtos';
import { getCookie } from '@web/services/cookies';
import { http } from '@web/services/http';
import { Produtos } from '@web/utils/produtos';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu } from 'types/menu';

const TypeMenu = ({ type, menus }: any) => {
  // const [productsData, setProductcsData] = useState(() => {
  //   const newProduct = Produtos.map((product) => ({ ...product, anunciante: false }));
  //   if (Produtos.length > 5) {
  //     newProduct[4].anunciante = true;
  //   } else {
  //     newProduct[Produtos.length - 1].anunciante = true;
  //   }
  //   return newProduct;
  // });
  const router = useRouter();
  const TypeFormated = router?.query?.nome;

  return (
    <section className="w-full bg-fundo-400 flex flex-col xl:items-center">
      <HeaderBanner
        responser={menus.menuResponser}
        text={menus.menuName}
        url={menus.menuImage}
      />
      <div className='xl:max-w-[1300px] w-full flex flex-col'>
        <h1 className="text-md tracking-4 uppercase p-6 pb-0 text-red-600 self-start">
          {TypeFormated}
        </h1>
        <BackButton menuPath={menus} />
        <div className="w-full h-auto flex flex-col lg:grid lg:grid-cols-3 gap-6 py-6 pb-28 px-6">
            {Produtos.map((produto, index) => {
              return (
                <>
                  <ProdutosContent
                    key={produto.id}
                    nome={produto.nome}
                    img={produto.img}
                    descricao={produto.descricao}
                    preco={produto.preco}
                  />
                  {produto.anunciante && (
                    <div className="w-full h-auto p-6 lg:hidden">
                      {type?.images.advertiser && (
                            <div className="w-full h-full md:h-[15rem] bg-golden-400 shadow-lg shadow-black/90">
                                <Image className='w-full h-full' src={type.images.advertiser} width={1000} height={500} alt='banner-anunciante' />
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
  const cookies = getCookie(context, '_CODE_VALID')
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

  console.log(menus)
  
  const MenuType = menus?.productTypes.filter((item)=> item.id === context?.params?.type)

  return {
    props: {
      menus,
      type: MenuType?.[0],
    },
  };
};

export default TypeMenu;
