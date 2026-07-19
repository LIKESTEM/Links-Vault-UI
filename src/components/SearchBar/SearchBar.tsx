import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.shell}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 15.5A6.5 6.5 0 1 0 9 2.5a6.5 6.5 0 0 0 0 13Zm9 2-4.35-4.35"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        type="search"
        className={styles.input}
        placeholder="Search by title, URL, description or tag..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search saved links"
      />
    </div>
  );
}
