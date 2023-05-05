import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

function addDot(value: string) {
  const newValue = value;
  const number = newValue.slice(0, -2);
  const decimal = newValue.slice(-2);

  if (number.length <= 3) return `${number}.${decimal}`;
  return `${number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimal}`;
}

export const CurrencyInput = ({
  id,
  currency,
  onChange,
  required,
  defaultValue,
  maxLength = 7,
}: {
  id?: string;
  currency: string;
  required?: boolean;
  onChange: (v: string) => void;
  defaultValue?: string;
  maxLength: number;
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue ? defaultValue : addDot('000'));

  function handleAddDigit(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (ev.key === 'Tab') {
      (inputRef.current?.nextElementSibling as HTMLElement)?.focus();
      return;
    }
    setValue((prev) => {
      const valueClear = prev.replaceAll(/,|\./g, '');
      let newValue = (
        valueClear + (valueClear.length >= maxLength ? '' : ev.key.replace(/\D+/, ''))
      ).replace(/^0+/, '');

      if (newValue.length <= 3) {
        const newValueSplit = newValue.split('');
        newValue = `${[
          ...new Array(3 - newValueSplit.length).fill('0'),
          ...newValueSplit,
        ].join('')}`;
      }
      return addDot(ev.key === 'Backspace' ? newValue.slice(0, -1) : newValue);
    });
  }

  useEffect(() => onChange(value), [value, onChange]);

  return (
    <div className="cursor-text">
      <div
        tabIndex={0}
        className="flex gap-1 outline-none [&>span>span]:focus:animate-pulse [&>span>span]:focus:text-primary-500"
        ref={inputRef}
        onKeyDown={handleAddDigit}
      >
        <span className="text-2xl mt-2">{currency}</span>
        <span className={clsx('text-6xl', {})}>
          {value.split('.')[0].length ? value.split('.')[0] : '0'}
        </span>
        <span className="text-2xl mt-2">
          {value.split('.')[1][0]}
          <span className="">{value.split('.')[1][1]}</span>
        </span>
      </div>

      <input
        type="text"
        id={id}
        className="absolute opacity-0"
        tabIndex={-1}
        aria-hidden
        onFocus={() => inputRef.current?.focus()}
        required={required}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );
};
