import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { createContext, useContext, useEffect, useState } from 'react';

type ModalContextProps = {
  id: string;
  open: boolean;
  toggleModal: () => void;
};

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
export const useModal = () => useContext(ModalContext);

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

const ModalTrigger: GTypes.FC<{
  asChild?: boolean;
}> = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  const { id, toggleModal } = useModal();

  return (
    <Comp
      {...props}
      type="button"
      aria-label="Toggle modal"
      onClick={(ev) => {
        if (props.onClick) {
          const result = props.onClick(ev) as any;
          if (result === 'no-open') return;
          toggleModal();
        } else toggleModal();
      }}
      aria-labelledby={id}
    />
  );
};

const ModalPortal: GTypes.FC<{
  classNames?: { container?: string; backdrop?: string };
}> = ({ children, classNames, ...props }) => {
  const { id, toggleModal, open } = useModal();

  return (
    <div
      className={clsx(
        'flex fixed top-0 z-[100] left-0 h-screen w-full [&>*]:scale-75 items-center transition justify-center invisible',
        classNames?.container,
        { '[&>*]:!scale-100 !visible': open },
      )}
    >
      <div
        {...props}
        id={id}
        aria-hidden={!open}
        role="dialog"
        className={clsx('user-select-none relative z-50', props.className)}
        onClick={(ev) => {
          props.onClick && props.onClick(ev);
        }}
      >
        {children}
      </div>
      <div
        onClick={toggleModal}
        className={clsx(
          'absolute top-0 left-0 z-40 h-screen w-full bg-black bg-opacity-0',
          classNames?.backdrop,
          { '!bg-opacity-60': open },
        )}
        aria-hidden
      />
    </div>
  );
};

export const Modal = {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Portal: ModalPortal,
};
