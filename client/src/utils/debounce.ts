import type { ChangeEvent } from 'react';

export const debounce = (onChange: (form: HTMLFormElement) => void) => {
  let timeout: NodeJS.Timeout;
  return (e: ChangeEvent<HTMLInputElement>) => {
    const form = e.currentTarget.form;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(form!);
    }, 2000);
  };
};
