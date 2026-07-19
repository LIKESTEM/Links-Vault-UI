import { Button } from '../Inputs/Button';
import styles from './Header.module.css';

interface HeaderProps {
  onAddLink: () => void;
}

export function Header({ onAddLink }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.5 14.5 14.5 9.5M11 6.5l1.379-1.379a3.5 3.5 0 1 1 4.95 4.95L15.95 11.45M13 17.5l-1.379 1.379a3.5 3.5 0 1 1-4.95-4.95L8.05 12.55"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <h1 className={styles.title}>Links Vault</h1>
            <p className={styles.tagline}>Your bookmarks, everywhere you go</p>
          </div>
        </div>
        <Button variant="primary" onClick={onAddLink}>
          + Add Link
        </Button>
      </div>
    </header>
  );
}
