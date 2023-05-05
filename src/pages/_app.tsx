import type { AppProps } from 'next/app';
import { SessionContextProvider, type Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Slide, ToastContainer } from 'react-toastify';
import { SidebarDash } from '@web/components/Sidebar/SidebarDash';
import { Lato } from 'next/font/google';
import React, { useState } from 'react';

import '@web/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

import { SideBar } from '@web/components/Pages/Cardapio/sidebar/SidebarCardapio';
import { SideBarCardapioRoot } from '@web/components/Pages/Cardapio/sidebar';

const lato = Lato({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-primary',
});

const App = ({
  Component,
  pageProps,
  router,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const Comp = !router.pathname.includes('/admin/dash')
    ? SideBarCardapioRoot
    : React.Fragment;
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <div className={`${lato.variable} ${lato.className}`}>
        <div className="flex min-h-screen w-full">
          {router.pathname.includes('/admin/dash') && <SidebarDash />}
          <Comp hiddenHamburguer={router.pathname === '/'}>
            {!router.pathname.includes('/admin/dash') && <SideBar />}
            <Component {...pageProps} />
          </Comp>
        </div>
        <ToastContainer limit={4} closeOnClick autoClose={5 * 1000} transition={Slide} />
      </div>
    </SessionContextProvider>
  );
};

export default App;
