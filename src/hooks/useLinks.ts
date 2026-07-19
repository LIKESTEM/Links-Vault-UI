import { useLocalStorage } from './useLocalStorage';
import type { Link } from '../types/link';

const STORAGE_KEY = 'links-vault:links';

export function useLinks() {
  const [links, setLinks] = useLocalStorage<Link[]>(STORAGE_KEY, []);

  function addLink(data: Omit<Link, 'id' | 'createdAt'>) {
    const link: Link = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setLinks((prev) => [link, ...prev]);
  }

  function updateLink(id: string, data: Partial<Omit<Link, 'id' | 'createdAt'>>) {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, ...data } : link)));
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  return { links, addLink, updateLink, deleteLink };
}
