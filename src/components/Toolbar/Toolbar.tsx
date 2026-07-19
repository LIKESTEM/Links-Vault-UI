import type { Link } from '../../types/link';
import { SearchBar } from '../SearchBar/SearchBar';
import { TagFilter } from '../TagFilter/TagFilter';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  links: Link[];
  query: string;
  onQueryChange: (query: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export function Toolbar({ links, query, onQueryChange, selectedTag, onSelectTag }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <SearchBar value={query} onChange={onQueryChange} />
      <TagFilter links={links} selectedTag={selectedTag} onSelectTag={onSelectTag} />
    </div>
  );
}
