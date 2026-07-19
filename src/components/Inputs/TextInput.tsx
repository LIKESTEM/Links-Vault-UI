import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './Inputs.module.css';

interface BaseProps {
  label: string;
  error?: string;
  multiline?: boolean;
}

type TextInputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

export const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  ({ label, error, multiline, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={styles.field}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        {multiline ? (
          <textarea
            id={inputId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${styles.input} ${styles.textarea}`}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            ref={ref as React.Ref<HTMLInputElement>}
            className={styles.input}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
