import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Link } from '../../types/link';
import { TextInput } from '../Inputs/TextInput';
import { TagInput } from '../Inputs/TagInput';
import { Button } from '../Inputs/Button';
import styles from './LinkForm.module.css';

export type LinkFormData = Omit<Link, 'id' | 'createdAt'>;

interface LinkFormProps {
  mode: 'create' | 'edit';
  initialLink?: Link;
  onSubmit: (data: LinkFormData) => void;
  onCancel: () => void;
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function LinkForm({ mode, initialLink, onSubmit, onCancel }: LinkFormProps) {
  const [title, setTitle] = useState(initialLink?.title ?? '');
  const [url, setUrl] = useState(initialLink?.url ?? '');
  const [description, setDescription] = useState(initialLink?.description ?? '');
  const [tags, setTags] = useState<string[]>(initialLink?.tags ?? []);
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors: { title?: string; url?: string } = {};
    if (!title.trim()) nextErrors.title = 'Title is required';
    if (!url.trim()) nextErrors.url = 'URL is required';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      url: normalizeUrl(url),
      description: description.trim(),
      tags,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        placeholder="My favorite article"
      />
      <TextInput
        label="Link (URL)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={errors.url}
        placeholder="https://example.com"
      />
      <TextInput
        label="Description"
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What is this link about?"
      />
      <TagInput label="Tags" hint="(optional)" value={tags} onChange={setTags} />

      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {mode === 'create' ? 'Save Link' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
