import clsx from 'clsx';
import ReactSelect from 'react-select';

export const Select = ({
  multi,
  disabled,
  onChange,
  value,
  defaultValue,
  ...props
}: {
  options: { value: string; label: string }[];
  id?: string;
  required?: boolean;
  multi?: boolean;
  value?: { value: string; label: string }[];
  disabled?: boolean;
  onChange: (options: { value: string; label: string }[]) => void;
  defaultValue?: { value: string; label: string }[];
}) => {
  return (
    <ReactSelect
      {...props}
      isMulti={multi}
      isDisabled={disabled}
      value={value}
      defaultValue={multi ? defaultValue : defaultValue?.[0]}
      onChange={(ev) => onChange(Array.isArray(ev) ? ev : [ev])}
      classNames={{
        control: ({ isDisabled }) =>
          clsx(
            'w-full border !border-gray-400 bg-white transition-all focus-within:!border-gray-950 !rounded-lg py-1.5 px-2 ring-primary-500/30 focus-within:ring-4',
            { 'opacity-50 pointer-events-none': isDisabled },
          ),
        container: ({ isDisabled }) =>
          isDisabled ? '!cursor-not-allowed pointer-events-auto' : '',
        input: () => '!m-0 !p-0',
        placeholder: () => '!text-gray-800 !mx-0',
        indicatorSeparator: () => '!bg-gray-400 !my-0',
        dropdownIndicator: () => '!text-gray-400 hover:!text-gray-950 !py-0',
        menu: () => '!rounded-lg',
        noOptionsMessage: () => '!text-gray-400',
      }}
    />
  );
};
