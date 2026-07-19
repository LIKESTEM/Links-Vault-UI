import type { ButtonHTMLAttributes } from 'react';
import styles from './Inputs.module.css';

type Variant = 'primary' | 'outline' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  return <button type="button" className={classes} {...rest} />;
}
