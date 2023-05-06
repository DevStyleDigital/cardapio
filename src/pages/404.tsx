import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Custom404;
