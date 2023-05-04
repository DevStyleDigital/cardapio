import Image from 'next/image';
import FundoImg from '../web/assets/img/fundo.png';
import Logo from '../web/assets/img/logo.png';
import { useSideBar } from '@web/components/Pages/Cardapio/sidebar';

const Home = () => {
  const { setSidebarOpen } = useSideBar();
  return (
    <>
      <section className="w-full h-screen relative bg-black">
        <Image
          className="w-full h-full"
          src={FundoImg}
          alt="fundo-inicio"
          width={1290}
          height={2793}
        />
        <div className="w-full h-full top-0 absolute z-40 flex flex-col justify-center items-center gap-16 px-8">
          <div className="w-full h-40 bg-white relative"></div>
          <Image
            className="w-3/5 h-auto sm:w-2/5 md:w-2/6 lg:w-1/4 xl:w-1/5 2xl:w-2/12"
            src={Logo}
            alt="Logo"
            width={378}
            height={520}
          />
          <div className="text-golden-400 text-sm sm:text-base md:text-lg uppercase tracking-3 pb-2 border-b-2 border-golden-400 hover:text-golden-500 hover:border-golden-500 transition-all">
            <button
              type="button"
              aria-labelledby="sidebar-menu"
              onClick={() => setSidebarOpen(true)}
            >
              Ver Menu
            </button>
          </div>
          <div className="w-full h-40 bg-white relative"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
