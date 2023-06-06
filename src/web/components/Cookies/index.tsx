import { Cross1Icon } from '@radix-ui/react-icons';
import { getCookie } from '@web/services/cookies';
import { setCookie } from 'nookies';
import { useEffect, useState } from 'react';

const AcceptCookie = () => {
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    const cookie = getCookie(undefined, '_ACCEPT_COOKIE');
    setOpen(!cookie);
  }, []);

  function CreateCookie() {
    setCookie(undefined, '_ACCEPT_COOKIE', 'true', {
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    setOpen(false);
  }

  return (
    <>
      {open && (
        <div className="w-[300px] h-auto min-h-[150px] bg-fundo-400 absolute z-[999] bottom-3 left-3 rounded-md display flex flex-col gap-4 p-4 shadow-lg shadow-black/90 animate-go">
          <div className="w-full h-full flex justify-between items-start">
            <h1 className="text-md font-bold text-golden-400">Accept Cookies</h1>
            <Cross1Icon className="w-4 h-4 text-white" onClick={() => CreateCookie()} />
          </div>
          <div className="w-full h-full">
            <p className="text-sm md:text-md text-white">
              Ao utilizar esse site você permite e concorda com a utilização de cookies
              para melhorar sua experiência com nossa aplicação.
            </p>
          </div>
          {/* <div className="w-full h-full flex justify-end">
                    <button className="text-white bg-golden-400 py-2 px-4 font-semibold  rounded-md" onClick={() => CreateCookie()}>Aceitar</button>
                </div> */}
        </div>
      )}
    </>
  );
};

export default AcceptCookie;
