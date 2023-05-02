import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Input } from '.';

export const InputPassword: GTypes.FC<
  { hasError: (v: boolean, message: string | null) => void },
  {},
  false
> = ({ hasError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hasError(!!error, error);
  }, [error, hasError]);

  return (
    <Input.Root id="password" error={error}>
      <Input.Label>Password:</Input.Label>
      <Input.Icon
        dir="right"
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="********"
        required
        onChange={({ target: { value } }) =>
          setError(
            value.length < 8 && value.length > 0
              ? 'The password must have more than 8 characters'
              : null,
          )
        }
      >
        <button
          className="outline-none"
          type="button"
          aria-label="Show/hide password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeClosedIcon className="w-4 h-4" />
          ) : (
            <EyeOpenIcon className="w-4 h-4" />
          )}
        </button>
      </Input.Icon>
    </Input.Root>
  );
};
