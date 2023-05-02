import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { createContext, useContext, useEffect, useState } from 'react';

type ModalContextProps = {
  id: string;
  open: boolean;
  toggleModal: () => void;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
const useModal = () => useContext(ModalContext);

const ModalRoot = ({ children, id }: GTypes.FCChildren & { id: string }) => {
  const [open, setOpen] = useState(false);

  function toggleModal() {
    setOpen(!open);
  }

  useEffect(() => {
    document.addEventListener('keydown', ({ key }) => key === 'Escape' && setOpen(false));
    return document.removeEventListener('keydown', () => false);
  }, []);

  return (
    <ModalContext.Provider value={{ id, open, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalTrigger: GTypes.FC<{ asChild?: boolean }> = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  const { id, toggleModal } = useModal();

  return (
    <Comp
      {...props}
      onClick={(ev) => {
        toggleModal();
        props.onClick && props.onClick(ev);
      }}
      aria-labelledby={id}
    />
  );
};

const ModalPortal: GTypes.FC = ({ children, ...props }) => {
  const { id, toggleModal, open } = useModal();

  return (
    <div
      {...props}
      id={id}
      aria-hidden={!open}
      role="dialog"
      className={clsx(
        'fixed user-select-none z-50 w-full transition [&>*]:scale-75 h-screen invisible flex items-center top-0 left-0 bg-black bg-opacity-0',
        {
          'bg-opacity-60 [&>*]:scale-100 visible': open,
        },
      )}
      onClick={(ev) => {
        if (ev.currentTarget.id === id) toggleModal();
        props.onClick && props.onClick(ev);
      }}
    >
      {children}
    </div>
  );
};

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
};
