import { useId, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { getTagColor } from '../../utils/tagColor';
import styles from './Inputs.module.css';

interface TagInputProps {
  label: string;
  hint?: string;
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ label, hint, value, onChange }: TagInputProps) {
  const [draft, setDraft] = useState('');
  const inputId = useId();

  function commitTag() {
    const tag = draft.trim().replace(/,$/, '');
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setDraft('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commitTag();
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {hint && <span className={styles.labelHint}> {hint}</span>}
      </label>
      <div className={styles.tagInputShell}>
        {value.map((tag) => (
          <span
            key={tag}
            className={styles.tagChipFilled}
            style={{ '--tag-color': getTagColor(tag) } as CSSProperties}
          >
            {tag}
            <button
              type="button"
              className={styles.tagRemove}
              onClick={() => removeTag(tag)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={inputId}
          className={styles.tagInputField}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitTag}
          placeholder={value.length === 0 ? 'Add a tag and press Enter' : ''}
        />
      </div>
    </div>
  );
}
