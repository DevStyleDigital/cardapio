import Image from 'next/image';
import FundoImg from '../../../../assets/img/fundo.png';
import Logo from '../../../../assets/img/logo2.png';
import Link from 'next/link';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { http } from '@web/services/http';
import type { Menu } from 'types/menu';
import useSWR from 'swr';

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SideBarProps>({} as SideBarProps);
export const useSideBar = () => useContext(SidebarContext);

export const SideBarCardapioRoot = ({
  children,
  hiddenHamburguer,
}: {
  children: any;
  hiddenHamburguer: any;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (ev) => ev.key === 'Escape' && setSidebarOpen(false),
    );
  });

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className="fixed w-14 h-16 top-12 right-8 z-[999] xl:right-24">
        <button
          type="button"
          className="w-full h-full "
          aria-labelledby="menu"
          onClick={handleSidebarToggle}
        >
          {sidebarOpen ? (
            <Cross1Icon className="w-full h-full text-golden-400" />
          ) : (
            !hiddenHamburguer && (
              <HamburgerMenuIcon className="w-full h-full text-golden-400" />
            )
          )}
        </button>
      </div>
      {children}
    </SidebarContext.Provider>
  );
};

const SideBarFundo = ({ children }: any) => {
  const { sidebarOpen } = useSideBar();
  return (
    <section
      id="sidebar-menu"
      className={clsx(
        'w-full h-screen fixed z-[99] pointer-events-none top-0 left-0 opacity-0 transition-all',
        { 'opacity-100 pointer-events-auto': sidebarOpen },
      )}
    >
      <div className="w-full h-screen relative bg-black">
        <Image
          className="w-full h-full"
          src={FundoImg}
          alt="fundo-inicio"
          width={1290}
          height={2793}
        />
        <div className="absolute w-full flex flex-col gap-12 p-12  top-0 h-full z-50">
          {children}
        </div>
      </div>
    </section>
  );
};

const SideBarTitle = ({ children }: any) => {
  return (
    <h1 className="text-golden-400 tracking-2 text-md flex flex-col gap-4 absolute">
      {children}
    </h1>
  );
};

const SideBarNavs = () => {
  const { setSidebarOpen } = useSideBar();
  const { data } = useSWR<Menu[]>('/api/menu', http.get);
  const { data: order } = useSWR<string[]>('/api/menus-order', http.get);
  return (
    <>
      <div className="mt-10 overflow-y-scroll h-full flex">
        <div className="w-full flex flex-col  justify-center lg:items-center gap-8">
          {data
            ?.sort((a, b) => (order || []).indexOf(a.id) - (order || []).indexOf(b.id))
            .map((item, index) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 md:gap-4 lg:items-center"
                >
                  <Link
                    href={`/${item.id}`}
                    onClick={() => setSidebarOpen(false)}
                    key={item.id}
                    className="text-white uppercase text-xl md:text-xl tracking-4"
                  >
                    {item.menuName}
                  </Link>
                  {data?.length - 1 > index && (
                    <div className="w-10/12 sm:w-3/6 md:w-6/12 lg:w-full h-px bg-red-600" />
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="absolute bottom-20 right-4 xl:right-24">
        <Image
          className="w-4/5 h-auto lg:w-20"
          src={Logo}
          alt="Logo"
          width={378}
          height={520}
        />
      </div>
    </>
  );
};

export const SidebarCardapio = {
  Root: SideBarCardapioRoot,
  Fundo: SideBarFundo,
  Title: SideBarTitle,
  Navs: SideBarNavs,
};
