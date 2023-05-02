import clsx from 'clsx';
import React, { useRef, useState } from 'react';

export const CurrencyInput = ({}: {
  onChange: (v: string) => void;
  defaultValue: string;
}) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('0.00');

  function handleAddDigit(ev: React.KeyboardEvent<HTMLDivElement>) {
    const key = ev.key;

    if (/^\d$|^\.$/.test(key)) {
      // Remove leading zeros
      const valueClean = value.replaceAll(/[,.]/g, '');
      let newValue = (valueClean + key).replace(/^0+/, '');
      if (newValue.length < 3)
        newValue = (3 - newValue.length === 2 ? '00' : '0') + newValue;

      // Update the value state
      // setValue(newValue);
    }
  }

  return (
    <div className="cursor-text">
      <div
        tabIndex={0}
        className="flex gap-1 outline-none [&>span>span]:focus:text-primary-500"
        ref={inputRef}
        onKeyDown={handleAddDigit}
      >
        <span className="text-4xl mt-4">R$</span>
        <span className={clsx('text-8xl', {})}>{value.split('.')[0]}</span>
        <span className="text-4xl mt-4">
          {value.split('.')[1][0]}
          <span>{value.split('.')[1][1]}</span>
        </span>
      </div>

      <input
        type="text"
        className="absolute opacity-0"
        onFocus={() => inputRef.current?.focus()}
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
      />
    </div>
  );
};
