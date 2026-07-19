import type { CSSProperties } from 'react';
import type { Link } from '../../types/link';
import { getTagColor } from '../../utils/tagColor';
import styles from './TagFilter.module.css';

interface TagFilterProps {
  links: Link[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function TagFilter({ links, selectedTag, onSelectTag }: TagFilterProps) {
  const uniqueTags = Array.from(new Set(links.flatMap((link) => link.tags))).sort();

  if (uniqueTags.length === 0) return null;

  return (
    <div className={styles.shell}>
      <button
        type="button"
        className={`${styles.chip} ${styles.allChip} ${selectedTag === null ? styles.active : ''}`}
        onClick={() => onSelectTag(null)}
      >
        All
      </button>
      {uniqueTags.map((tag) => {
        const color = getTagColor(tag);
        const isActive = selectedTag === tag;
        return (
          <button
            key={tag}
            type="button"
            className={`${styles.chip} ${isActive ? styles.tagActive : ''}`}
            style={{ '--tag-color': color } as CSSProperties}
            onClick={() => onSelectTag(isActive ? null : tag)}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
