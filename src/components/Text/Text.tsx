import type { ReactNode } from 'react';
import styles from './Text.module.css';

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}

export function Label({ children }: { children: ReactNode }) {
  return <span className={styles.label}>{children}</span>;
}

export function Muted({ children }: { children: ReactNode }) {
  return <p className={styles.muted}>{children}</p>;
}
