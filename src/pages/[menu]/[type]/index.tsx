import BackButton from '@web/components/Button/back';
import HeaderBanner from '@web/components/Pages/Cardapio/header';
import ProdutosContent from '@web/components/produtos';
import { Produtos } from '@web/utils/produtos';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const TypeMenu = ({ type, menu }: any) => {
  const [productsData, setProductcsData] = useState(() => {
    const newProduct = Produtos.map((product) => ({ ...product, anunciante: false }));
    if (Produtos.length > 5) {
      newProduct[4].anunciante = true;
    } else {
      newProduct[Produtos.length - 1].anunciante = true;
    }
    return newProduct;
  });
  const router = useRouter();
  const TypeFormated = router?.query?.nome;

  return (
    <section className="w-full bg-fundo-400 flex flex-col">
      <HeaderBanner
        text="à la carte"
        url="https://i2.wp.com/files.agro20.com.br/uploads/2020/03/comidabrasileira3.jpg?fit=1024%2C585&ssl=1"
      />
      <h1 className="text-md tracking-4 uppercase p-6 pb-0 text-red-600">
        {TypeFormated}
      </h1>
      <BackButton menuPath={menu} />
      <div className="w-full h-auto flex flex-col gap-6 py-6 pb-28 px-6">
        {productsData.map((produto, index) => {
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
                <div className="w-full h-40">
                  <div className="w-full h-full bg-white">{/* Anunciante aqui */}</div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const type = context?.params?.type;
  const menu = context?.params?.menu;
  return {
    props: {
      menu,
      type,
    },
  };
};

export default TypeMenu;
