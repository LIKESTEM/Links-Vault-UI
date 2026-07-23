import { Button } from '../Inputs/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  hasLinks: boolean;
  onAddLink: () => void;
}

export function EmptyState({ hasLinks, onAddLink }: EmptyStateProps) {
  return (
    <div className={styles.shell}>
      <span className={styles.icon} aria-hidden="true">
        {hasLinks ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 18.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm10 2-5.2-5.2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 8.5 12 13l8-4.5M4 8.5V17a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 17V8.5M4 8.5l1.2-3.6A1.5 1.5 0 0 1 6.62 4h10.76a1.5 1.5 0 0 1 1.42 1L20 8.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <h2 className={styles.title}>{hasLinks ? 'No matching links' : 'No links yet'}</h2>
      <p className={styles.subtitle}>
        {hasLinks
          ? 'Try a different search term or clear the tag filter.'
          : 'Click "Add link" to save your first bookmark.'}
      </p>
      {!hasLinks && (
        <Button variant="primary" onClick={onAddLink}>
          + Add Link
        </Button>
      )}
    </div>
  );
}
