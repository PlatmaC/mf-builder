import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cx from 'classnames';

const Button = ({
  disabled,
  loading,
  className,
  onClick,
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { loading?: boolean }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      className={cx(`btn btn-primary w-100 ${className}`, { 'btn-loading': loading })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
