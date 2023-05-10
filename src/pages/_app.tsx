import type { AppProps } from 'next/app';
import { SessionContextProvider, type Session } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Slide, ToastContainer } from 'react-toastify';
import { SidebarDash } from '@web/components/Sidebar/SidebarDash';
import { Lato } from 'next/font/google';
import React, { useState } from 'react';
import { registerPlugin } from 'react-filepond';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

import '@web/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { SideBar } from '@web/components/Pages/Cardapio/sidebar/SidebarCardapio';
import { SideBarCardapioRoot } from '@web/components/Pages/Cardapio/sidebar';
import Head from 'next/head';
import AcceptCookie from '@web/components/Cookies';
import { GetServerSideProps } from 'next';
import { getCookie } from '@web/services/cookies';
registerPlugin(
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
);

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
  const Comp =
    !router.pathname.includes('/admin') &&
    !router.pathname.includes('/code') &&
    !router.pathname.includes('/404')
      ? SideBarCardapioRoot
      : React.Fragment;
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Head>
        <title>Yoshis</title>
      </Head>
      <div className={`${lato.variable} ${lato.className}`}>
        <div className="flex min-h-screen w-full">
          {router.pathname.includes('/admin/dash') && <SidebarDash />}
          <Comp hiddenHamburguer={router.pathname === '/'}>
            {!router.pathname.includes('/admin/dash') && <SideBar />}
              <Component {...pageProps} />
          </Comp>
        </div>
        <AcceptCookie />
        <ToastContainer limit={4} closeOnClick autoClose={5 * 1000} transition={Slide} />
      </div>
    </SessionContextProvider>
  );
};


export default App;
