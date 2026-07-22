import type { Link } from '../types/link';

export interface LinkGroup {
  tag: string;
  isUntagged: boolean;
  links: Link[];
}

export const UNTAGGED_LABEL = 'Untagged';

export function groupLinksByTag(links: Link[], selectedTag: string | null): LinkGroup[] {
  if (selectedTag) {
    return links.length > 0 ? [{ tag: selectedTag, isUntagged: false, links }] : [];
  }

  const map = new Map<string, Link[]>();
  for (const link of links) {
    const tags = link.tags.length > 0 ? link.tags : [UNTAGGED_LABEL];
    for (const tag of tags) {
      const group = map.get(tag);
      if (group) group.push(link);
      else map.set(tag, [link]);
    }
  }

  return Array.from(map.entries())
    .map(([tag, groupLinks]) => ({
      tag,
      isUntagged: tag === UNTAGGED_LABEL,
      links: [...groupLinks].sort((a, b) => b.createdAt - a.createdAt),
    }))
    .sort((a, b) => b.links[0].createdAt - a.links[0].createdAt);
}
