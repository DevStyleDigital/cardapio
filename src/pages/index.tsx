import Image from 'next/image';
import FundoImg from '../web/assets/img/fundo.png';
import Logo from '../web/assets/img/logo.png';
import { useSideBar } from '@web/components/Pages/Cardapio/sidebar';
import { GetServerSideProps } from 'next';
import { getCookie } from '@web/services/cookies';
import clsx from 'clsx';
import useSWR from 'swr';
import { http } from '@web/services/http';
import Loading from '@web/components/Loading';

const Home = () => {
  const { setSidebarOpen, sidebarOpen } = useSideBar();
  const { data, isLoading } = useSWR<any>('/api/home', http.get);

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <>
      <section
        className={clsx('w-full h-screen relative bg-black', {
          'h-screen overflow-hidden': sidebarOpen,
        })}
      >
        <Image
          className="w-full h-full"
          src={FundoImg}
          alt="fundo-inicio"
          width={1290}
          height={2793}
        />
        <div className="w-full h-full top-0 absolute z-40 flex flex-col justify-between items-center gap-6 px-8 py-8">
          <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
            <Image
              className="w-[17rem] h-auto"
              src={Logo}
              alt="Logo"
              width={378}
              height={520}
            />
            <div className="text-golden-400 pb-2 border-b-2 border-golden-400 hover:text-golden-500 hover:border-golden-500 transition-all">
              <button
                type="button"
                className="tracking-3 uppercase text-md sm:text-base md:text-lg"
                aria-labelledby="sidebar-menu"
                onClick={() => setSidebarOpen(true)}
              >
                Ver Menu
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center h-auto mb-8">
            <div className="w-full h-full max-w-[600px] md:max-w-[500px] ">
              <Image
                src={data?.homeImage}
                width={500}
                height={500}
                alt="patrocinador"
                className="w-full h-full overflow-hidden"
              />
            </div>
          </div>
          <h1 className="text-white text-xs opacity-70">Intelligence By Core.Ag</h1>
        </div>
      </section>
    </>
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
  return {
    props: {},
  };
};

export default Home;
