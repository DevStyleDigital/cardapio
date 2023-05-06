import Image from 'next/image';
import FundoImg from '../../../../assets/img/fundo.png';
import Logo from '../../../../assets/img/logo2.png';
import { MenuItens } from '@web/utils/menu';
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
  hiddenHamburguer: boolean;
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
      <div className="fixed w-16 z-[200] h-16 top-12 right-8">
        <button
          type="button"
          className="w-full h-full"
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
        <div className="absolute w-full flex flex-col p-14 top-0 h-full z-50">
          {children}
        </div>
      </div>
    </section>
  );
};

const SideBarTitle = ({ children }: any) => {
  return (
    <h1 className="text-golden-400 tracking-2 text-md flex flex-col gap-4">{children}</h1>
  );
};

const SideBarNavs = () => {
  const { setSidebarOpen } = useSideBar();
  const [menuItems, setMenuItems] = useState([] as Menu[]);
  useEffect(() => {
    async function fetchData() {
      const response = await http
        .get<Menu[]>('/api/menu')
        .then((res) => res)
        .catch(() => []);
      setMenuItems(response);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col pt-18 justify-center lg:items-center  gap-10">
      {menuItems.map((item, index) => {
        return (
          <div key={item.id} className="flex flex-col gap-6 md:gap-10 lg:items-center">
            <Link
              href={`/${item.id}`}
              onClick={() => setSidebarOpen(false)}
              key={item.id}
              className="text-white uppercase text-xl md:text-3xl tracking-4"
            >
              {item.menuName}
            </Link>
            {menuItems.length - 1 > index && (
              <div className="w-10/12 sm:w-3/6 md:w-6/12 lg:w-full h-px bg-red-600" />
            )}
          </div>
        );
      })}
      <div className="flex justify-end">
        <Image
          className="w-1/4 h-auto md:w-1/6 lg:w-32"
          src={Logo}
          alt="Logo"
          width={378}
          height={520}
        />
      </div>
    </div>
  );
};

export const SidebarCardapio = {
  Root: SideBarCardapioRoot,
  Fundo: SideBarFundo,
  Title: SideBarTitle,
  Navs: SideBarNavs,
};
