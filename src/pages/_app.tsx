import type { AppProps } from 'next/app';
import { Slide, ToastContainer } from 'react-toastify';
import { SidebarDash } from '@web/components/Sidebar/SidebarDash';
import { Lato } from 'next/font/google';

import '@web/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const lato = Lato({
  weight: ['300', '400'],
  subsets: ['latin'],
  variable: '--font-primary',
});

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <div className={`${lato.variable} ${lato.className}`}>
      <div className="flex min-h-screen w-full">
        {router.pathname.includes('/admin/dash') && <SidebarDash />}
        <Component {...pageProps} />
      </div>
      <ToastContainer limit={4} closeOnClick autoClose={5 * 1000} transition={Slide} />
    </div>
  );
};

export default App;
