import { http } from '@web/services/http';
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { Sidebar } from '.';
import {
  ArchiveIcon,
  ExitIcon,
  HomeIcon,
  LockClosedIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { Input } from '../Input';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { cookie } from '@web/services/cookies';
import { useRouter } from 'next/router';

export const SidebarDash = () => {
  const router = useRouter();
  const [codeData, setCode] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function handleSubmitForm(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const {
      code: { value: code },
    } = ev.currentTarget;

    http
      .patch('api/code', { code })
      .then(() => toast.success('Code updated!'))
      .catch(({ response: { data: err } }) => toast.error(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    http
      .get('api/code')
      .then((res) => setCode(res as string))
      .catch(() => toast.error('Error on get code of day'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Sidebar.Root className="gap-8">
      <Sidebar.Logo className="text-primary-500">
        <Logo.Extended />
      </Sidebar.Logo>
      <form onSubmit={handleSubmitForm} className="mx-4 flex flex-col gap-1">
        <Input.Root id="code" error={null}>
          <Input.Icon
            required
            name="code"
            placeholder="Code of day"
            defaultValue={codeData}
          >
            <LockClosedIcon className="w-5 h-5" />
          </Input.Icon>
        </Input.Root>
        <Button type="submit" loading={loading}>
          Inset code
        </Button>
      </form>
      <div className="flex flex-col justify-between h-full">
        <Sidebar.Nav>
          <Sidebar.Link href="/admin/dash">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Sidebar.Link>
          <Sidebar.Link href="/admin/dash/menu">
            <ReaderIcon className="w-5 h-5" />
            <span>Menu</span>
          </Sidebar.Link>
          <Sidebar.Link href="/admin/dash/products">
            <ArchiveIcon className="w-5 h-5" />
            <span>Products</span>
          </Sidebar.Link>
        </Sidebar.Nav>
        <Sidebar.Nav>
          <Sidebar.Link asChild>
            <button
              onClick={() => {
                cookie.del(null, 'supabase-auth-token');
                router.push('/admin');
              }}
            >
              <ExitIcon className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </Sidebar.Link>
        </Sidebar.Nav>
      </div>
    </Sidebar.Root>
  );
};
