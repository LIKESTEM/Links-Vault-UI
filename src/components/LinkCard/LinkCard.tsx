import type { CSSProperties } from 'react';
import type { Link } from '../../types/link';
import { getTagColor } from '../../utils/tagColor';
import styles from './LinkCard.module.css';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onRequestDelete: (link: Link) => void;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function LinkCard({ link, onEdit, onRequestDelete }: LinkCardProps) {
  const hostname = getHostname(link.url);
  const avatarColor = getTagColor(link.tags[0] ?? hostname);

  return (
    <li className={styles.row}>
      <a
        href={link.url}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.rowLink}
        title={link.url}
      >
        <span
          className={styles.avatar}
          style={{ '--tag-color': avatarColor } as CSSProperties}
          aria-hidden="true"
        >
          {hostname.charAt(0).toUpperCase() || '#'}
        </span>
        <span className={styles.rowText}>
          <span className={styles.rowTitle}>{link.title}</span>
          <span className={styles.rowUrl}>{link.url}</span>
          {link.description && <span className={styles.rowDescription}>{link.description}</span>}
        </span>
      </a>

      {link.tags.length > 0 && (
        <ul className={styles.tags}>
          {link.tags.map((tag) => (
            <li
              key={tag}
              className={styles.tag}
              style={{ '--tag-color': getTagColor(tag) } as CSSProperties}
            >
              <span className={styles.tagDot} />
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.rowActions}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label={`Edit ${link.title}`}
          onClick={() => onEdit(link)}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.5 3.5 16.5 6.5M3 17l.7-3.1L12.1 5.5a1.5 1.5 0 0 1 2.1 0l1.3 1.3a1.5 1.5 0 0 1 0 2.1L7.1 16.3 3 17Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.iconButton}
          data-variant="danger"
          aria-label={`Delete ${link.title}`}
          onClick={() => onRequestDelete(link)}
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6h12M8 6V4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V6m-6.5 0 .6 9.4a1.5 1.5 0 0 0 1.5 1.4h4.8a1.5 1.5 0 0 0 1.5-1.4L15.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
