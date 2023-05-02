import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Input } from '.';

export const InputEmail: GTypes.FC<
  { hasError: (v: boolean, message: string | null) => void },
  {},
  false
> = ({ hasError }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hasError(!!error, error);
  }, [error, hasError]);

  return (
    <Input.Root id="email" error={error}>
      <Input.Label>Email:</Input.Label>
      <Input.Icon
        dir="right"
        type="email"
        name="email"
        placeholder="example@domain.com"
        required
        onChange={({ target: { value } }) =>
          setError(value.length > 0 && value.length <= 5 ? 'Invalid email' : null)
        }
      >
        <EnvelopeClosedIcon className="w-4 h-4" />
      </Input.Icon>
    </Input.Root>
  );
};
