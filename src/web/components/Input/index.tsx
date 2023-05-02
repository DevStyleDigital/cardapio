import clsx from 'clsx';
import React, { createContext, useContext } from 'react';

type InputContextProps = {
  id: string;
  error: string | null;
};

const InputContext = createContext<InputContextProps>({} as InputContextProps);
const useInput = () => useContext(InputContext);

const InputContainer: GTypes.FC = ({ ...props }) => {
  const { error } = useInput();
  return (
    <div
      {...props}
      className={clsx(
        'w-full border border-gray-400 transition-all focus-within:border-gray-950 rounded-lg py-2 px-4 ring-primary-500/30 focus-within:ring-4',
        props.className,
        {
          'ring-red-500/30 !border-red-500': !!error,
        },
      )}
    />
  );
};

const InputRoot: GTypes.FC<{ id: string; error: string | null }> = ({
  id,
  error,
  ...props
}) => {
  return (
    <InputContext.Provider value={{ error, id }}>
      <div {...props} className={clsx('w-full flex flex-col gap-1', props.className)} />
      <span role="status" className="text-red-500">
        {error}
      </span>
    </InputContext.Provider>
  );
};

const InputLabel: GTypes.FC = ({ ...props }) => {
  const { id } = useInput();
  return (
    <label
      {...props}
      htmlFor={id}
      className={clsx('w-full font-bold text-gray-900', props.className)}
    />
  );
};

const InputIcon: GTypes.FC<
  { dir?: 'left' | 'right' },
  React.InputHTMLAttributes<HTMLInputElement>,
  false
> = ({ dir = 'right', children, ...props }) => {
  const { error } = useInput();
  return (
    <InputContainer
      dir={dir}
      className={clsx('flex items-center gap-2', props.className, {
        '[&_svg]:text-red-500': !!error,
        'flex-row-reverse': dir === 'left',
        'flex-row': dir === 'right',
      })}
    >
      <Input {...props} unStyled />
      {children}
    </InputContainer>
  );
};

export const Input: GTypes.FC<
  { unStyled?: boolean },
  React.InputHTMLAttributes<HTMLInputElement>,
  false
> & {
  Root: typeof InputRoot;
  Icon: typeof InputIcon;
  Label: typeof InputLabel;
} = ({ unStyled, ...props }) => {
  const { id } = useInput();
  const Container = unStyled ? React.Fragment : InputContainer;

  return (
    <Container>
      <input
        {...props}
        id={id}
        className={clsx(
          'outline-none w-full bg-transparent placeholder:text-gray-700',
          props.className,
        )}
      />
    </Container>
  );
};

Input.Root = InputRoot;
Input.Icon = InputIcon;
Input.Label = InputLabel;
