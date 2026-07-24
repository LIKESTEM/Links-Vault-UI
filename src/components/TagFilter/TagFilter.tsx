import { useEffect, useRef, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (uniqueTags.length === 0) return null;

  const selectedColor = selectedTag ? getTagColor(selectedTag) : undefined;

  function handleSelect(tag: string | null) {
    onSelectTag(tag);
    setIsOpen(false);
  }

  return (
    <div className={styles.shell} ref={shellRef}>
      <button
        type="button"
        className={styles.trigger}
        style={selectedColor ? ({ '--tag-color': selectedColor } as CSSProperties) : undefined}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedTag ? (
          <span className={styles.triggerTag}>
            <span className={styles.dot} aria-hidden="true" />
            {selectedTag}
          </span>
        ) : (
          'All tags'
        )}
        <svg
          className={styles.chevron}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className={styles.menu} role="listbox">
          <li>
            <button
              type="button"
              className={`${styles.option} ${selectedTag === null ? styles.optionActive : ''}`}
              onClick={() => handleSelect(null)}
              role="option"
              aria-selected={selectedTag === null}
            >
              All tags
            </button>
          </li>
          {uniqueTags.map((tag) => {
            const color = getTagColor(tag);
            const isActive = selectedTag === tag;
            return (
              <li key={tag}>
                <button
                  type="button"
                  className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  style={{ '--tag-color': color } as CSSProperties}
                  onClick={() => handleSelect(isActive ? null : tag)}
                  role="option"
                  aria-selected={isActive}
                >
                  <span className={styles.dot} aria-hidden="true" />
                  {tag}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
