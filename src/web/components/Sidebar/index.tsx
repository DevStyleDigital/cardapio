import Link, { type LinkProps } from 'next/link';

import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

const SidebarRoot: GTypes.FC = ({ children, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (ev) => ev.key === 'Escape' && setSidebarOpen(false),
    );
  }, []);

  return (
    <>
      <div
        {...props}
        id="sidebar"
        className={clsx(
          'lg:sticky fixed h-screen bg-white left-0 top-0 z-20 transition-all shadow-lg min-w-[16rem] max-w-[16rem] w-full py-4 flex flex-col gap-2 lg:translate-x-0 -translate-x-full',
          props.className,
          { 'translate-x-0': sidebarOpen },
        )}
      >
        <button
          className={clsx(
            'lg:hidden absolute right-0 top-0 m-4 p-2 rounded-lg bg-gray-200 shadow-md',
            { 'translate-x-[calc(100%+1rem+1rem)] bg-white': !sidebarOpen },
          )}
          aria-label="Toggle Sidebar"
          aria-labelledby="sidebar"
          title="Toggle Sidebar"
          onClick={handleSidebarToggle}
        >
          {sidebarOpen ? (
            <Cross1Icon className="w-4 h-4" />
          ) : (
            <HamburgerMenuIcon className="w-4 h-4" />
          )}
        </button>
        {children}
      </div>
      {sidebarOpen && (
        <div
          aria-hidden
          className="fixed w-full h-screen z-10"
          onClick={handleSidebarToggle}
        />
      )}
    </>
  );
};

const SidebarLogo: GTypes.FC = ({ ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        'w-full flex justify-center items-center text-xl font-bold',
        props.className,
      )}
    />
  );
};

const SidebarNav: GTypes.FC = ({ ...props }) => {
  return <nav {...props} className={clsx('flex flex-col gap-2', props.className)} />;
};

const SidebarLink: GTypes.FC<
  Omit<LinkProps, 'href'> & {
    href?: string;
    asChild?: boolean;
    className?: string;
  },
  {},
  false
> = ({ asChild, ...props }) => {
  const { pathname } = useRouter();
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      href="/"
      {...props}
      className={clsx(
        'px-4 py-2 hover:bg-gray-200 border-l-4 border-transparent focus:bg-gray-300 outline-none transition flex items-center gap-4',
        props.className,
        {
          '!border-primary-400 bg-red-400/20 hover:bg-red-400/30 focus:bg-red-400/30':
            pathname.replace('/[id]', '') === props.href,
        },
      )}
    />
  );
};

export const Sidebar = {
  Root: SidebarRoot,
  Logo: SidebarLogo,
  Nav: SidebarNav,
  Link: SidebarLink,
};
