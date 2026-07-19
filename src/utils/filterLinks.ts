import type { Link } from '../types/link';

export function filterLinks(links: Link[], query: string, tag: string | null): Link[] {
  const normalizedQuery = query.trim().toLowerCase();

  return links.filter((link) => {
    const matchesTag = !tag || link.tags.includes(tag);
    if (!matchesTag) return false;

    if (!normalizedQuery) return true;

    return (
      link.title.toLowerCase().includes(normalizedQuery) ||
      link.url.toLowerCase().includes(normalizedQuery) ||
      link.description.toLowerCase().includes(normalizedQuery) ||
      link.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
    );
  });
}
