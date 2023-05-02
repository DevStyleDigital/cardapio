import { http } from '@web/services/http';
import { toast } from 'react-toastify';

import { useState } from 'react';
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

export const SidebarDash = () => {
  const [loading, setLoading] = useState(false);

  function handleSubmitForm(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const {
      code: { value: code },
    } = ev.currentTarget;

    http
      .patch('api/code', code)
      .then(() => toast.success('Code updated!'))
      .catch(({ response: { data: err } }) => toast.error(err.message))
      .finally(() => setLoading(false));
  }

  return (
    <Sidebar.Root className="gap-8">
      <Sidebar.Logo>
        <Logo.Extended className="text-primary-500" />
      </Sidebar.Logo>
      <form onSubmit={handleSubmitForm} className="mx-4 flex flex-col gap-1">
        <Input.Root id="code" error={null}>
          <Input.Icon required name="code" placeholder="Code of day" defaultValue={12345}>
            <LockClosedIcon className="w-5 h-5" />
          </Input.Icon>
        </Input.Root>
        <Button type="submit" loading={loading}>
          Inset code
        </Button>
      </form>
      <div className="flex flex-col justify-between h-full">
        <Sidebar.Nav>
          <Sidebar.Link href="/admin/dash/">
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
            <button onClick={() => true}>
              <ExitIcon className="w-5 h-5" />
              <span>Sign out</span>
            </button>
          </Sidebar.Link>
        </Sidebar.Nav>
      </div>
    </Sidebar.Root>
  );
};
