import { Button } from '../Inputs/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  hasLinks: boolean;
  onAddLink: () => void;
}

export function EmptyState({ hasLinks, onAddLink }: EmptyStateProps) {
  return (
    <div className={styles.shell}>
      <span className={hasLinks ? styles.icon : styles.imageWrap} aria-hidden="true">
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
          <img src="/images/empty-state.jpg" alt="" className={styles.image} />
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
