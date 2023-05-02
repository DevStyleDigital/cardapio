import { toast } from 'react-toastify';
import { Button } from '@web/components/Button';
import { InputEmail } from '@web/components/Input/InputEmail';
import { InputPassword } from '@web/components/Input/InputPassword';

import { http } from '@web/services/http';

import { useState } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmitForm(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (emailError || passwordError) return;

    const {
      email: { value: email },
      password: { value: password },
    } = ev.currentTarget;

    setLoading(true);

    http
      .post('/api/auth', { email, password })
      .then(() => router.push('/admin/dash'))
      .catch(({ response: { data: err } }) =>
        toast.error(err.message, { toastId: `r:auth-${err.type}` }),
      )
      .finally(() => setLoading(false));
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-200">
      <form
        className="bg-white gap-4 flex items-center justify-center flex-col md:rounded-lg shadow-lg py-8 px-4 md:h-fit h-full w-full md:w-96"
        onSubmit={handleSubmitForm}
      >
        <div className="w-full flex flex-col gap-2">
          <InputEmail hasError={setEmailError} />
          <InputPassword hasError={setPasswordError} />
        </div>
        <div className="w-full">
          <Button type="submit" loading={loading}>
            {loading ? <Button.Loading /> : 'Sign in'}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Admin;
