import { useEffect, useRef, useState } from 'react';
import type { Link } from '../../types/link';
import { Button } from '../Inputs/Button';
import { SearchBar } from '../SearchBar/SearchBar';
import { TagFilter } from '../TagFilter/TagFilter';
import styles from './Header.module.css';

interface HeaderProps {
  onAddLink: () => void;
  links: Link[];
  query: string;
  onQueryChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function Header({ onAddLink, links, query, onQueryChange, selectedTag, onSelectTag }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    function handleResize() {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container} ref={containerRef}>
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

        <Button variant="primary" className={styles.addButton} onClick={onAddLink}>
          + Add Link
        </Button>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={`${styles.burgerBar} ${isMenuOpen ? styles.burgerBarOpen : ''}`} aria-hidden="true" />
        </button>

        <div className={`${styles.toolbarRow} ${isMenuOpen ? styles.toolbarRowOpen : ''}`}>
          <SearchBar value={query} onChange={onQueryChange} />
          <TagFilter links={links} selectedTag={selectedTag} onSelectTag={onSelectTag} />
        </div>
      </div>
    </header>
  );
}
