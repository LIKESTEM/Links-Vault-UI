import { useMemo, useState } from 'react';
import { useLinks } from './hooks/useLinks';
import { filterLinks } from './utils/filterLinks';
import type { Link } from './types/link';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { LinkList } from './components/LinkList/LinkList';
import { Modal } from './components/Modal/Modal';
import { LinkForm } from './components/LinkForm/LinkForm';
import type { LinkFormData } from './components/LinkForm/LinkForm';
import { ToastStack } from './components/Toast/Toast';
import type { ToastItem, ToastVariant } from './components/Toast/Toast';
import './App.css';

export default function App() {
  const { links, addLink, updateLink, deleteLink } = useLinks();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [formState, setFormState] = useState<{ mode: 'create' | 'edit'; link?: Link } | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const visibleLinks = useMemo(() => filterLinks(links, query, selectedTag), [links, query, selectedTag]);

  function pushToast(message: string, variant: ToastVariant) {
    const toast: ToastItem = { id: crypto.randomUUID(), message, variant };
    setToasts((prev) => [...prev, toast]);
  }

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function handleSubmit(data: LinkFormData) {
    if (formState?.mode === 'edit' && formState.link) {
      updateLink(formState.link.id, data);
      pushToast('Link updated', 'success');
    } else {
      addLink(data);
      pushToast('Link saved', 'success');
    }
    setFormState(null);
  }

  function handleDelete(id: string) {
    deleteLink(id);
    pushToast('Link deleted', 'info');
  }

  return (
    <div className="app">
      <Header onAddLink={() => setFormState({ mode: 'create' })} />

      <main className="app-main">
        <Toolbar
          links={links}
          query={query}
          onQueryChange={setQuery}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        <LinkList
          links={visibleLinks}
          hasAnyLinks={links.length > 0}
          onEdit={(link) => setFormState({ mode: 'edit', link })}
          onDelete={handleDelete}
        />
      </main>

      <Modal
        isOpen={formState !== null}
        onClose={() => setFormState(null)}
        title={formState?.mode === 'edit' ? 'Edit Link' : 'Add Link'}
      >
        {formState && (
          <LinkForm
            mode={formState.mode}
            initialLink={formState.link}
            onSubmit={handleSubmit}
            onCancel={() => setFormState(null)}
          />
        )}
      </Modal>

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
