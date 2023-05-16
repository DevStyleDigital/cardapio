import { Input } from '@web/components/Input';
import { http } from '@web/services/http';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '../web/assets/img/logo.png';
import { Button } from '@web/components/Button';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { getCookie, setCookie } from '@web/services/cookies';
import { useRouter } from 'next/router';

const Code = ({ codeApi }: { codeApi: string }) => {
  const [code, setCode] = useState('');
  const router = useRouter();

  function ValidCode() {
    if (`${codeApi}` === code) {
      setCookie(undefined, '_CODE_VALID', 'true', {
        maxAge: 1000 * 60 * 60 * 3,
        path: '/',
      });
      router.push('/');
    } else {
      return toast.error('Código invalido!');
    }
  }

  return (
    <section className="w-screen relative h-screen flex flex-col gap-6 items-center justify-center bg-fundo-400 p-8">
      <Image
        className="w-[6rem] h-auto absolute bottom-12"
        src={Logo}
        alt="Logo"
        width={378}
        height={520}
      />
      <h1 className="text-white text-2xl font-bold text-center">
        Valide o código de segurança
      </h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={(ev) => {
          ev.preventDefault();
          ValidCode();
        }}
      >
        <Input.Root id="menu-name" error={null} className="max-w-lg">
          <Input
            className="py-1"
            required
            value={code}
            name="code"
            placeholder="Código"
            onChange={({ target: { value } }) => setCode(value)}
          />
        </Input.Root>
        <Button type="submit" className="gap-2 py-4">
          <span>Validar Codigo</span>
          <LockClosedIcon className="w-5 h-5" />
        </Button>
      </form>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = getCookie(context, '_CODE_VALID');
  if (cookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const code = await http
    .get('api/code')
    .then((res) => res)
    .catch(() => null);

  return {
    props: {
      codeApi: code,
    },
  };
};

export default Code;
