import { useState, type CSSProperties } from 'react';
import type { Link } from '../../types/link';
import { LinkCard } from '../LinkCard/LinkCard';
import { EmptyState } from '../EmptyState/EmptyState';
import { Modal } from '../Modal/Modal';
import { Button } from '../Inputs/Button';
import { groupLinksByTag } from '../../utils/groupLinks';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { getTagColor } from '../../utils/tagColor';
import styles from './LinkList.module.css';

interface LinkListProps {
  links: Link[];
  hasAnyLinks: boolean;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onAddLink: () => void;
}

export function LinkList({
  links,
  hasAnyLinks,
  selectedTag,
  onSelectTag,
  onEdit,
  onDelete,
  onAddLink,
}: LinkListProps) {
  const [pendingDelete, setPendingDelete] = useState<Link | null>(null);

  if (links.length === 0) {
    return <EmptyState hasLinks={hasAnyLinks} onAddLink={onAddLink} />;
  }

  const groups = groupLinksByTag(links, selectedTag);

  function confirmDelete() {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  }

  return (
    <>
      <div className={styles.groupList}>
        {groups.map((group) => {
          const meta = `${group.links.length} link${group.links.length === 1 ? '' : 's'} · ${formatRelativeTime(group.links[0].createdAt)}`;
          const headerContent = (
            <>
              <span className={styles.groupTitle}>
                {group.isUntagged ? group.tag : `'${group.tag}'`}
              </span>
              <span className={styles.groupMeta}>{meta}</span>
            </>
          );

          return (
            <section key={group.tag} className={styles.group}>
              {group.isUntagged ? (
                <div className={styles.groupHeader}>{headerContent}</div>
              ) : (
                <button
                  type="button"
                  className={styles.groupHeader}
                  style={{ '--tag-color': getTagColor(group.tag) } as CSSProperties}
                  aria-label={
                    selectedTag === group.tag
                      ? `Clear filter for '${group.tag}'`
                      : `Filter by '${group.tag}'`
                  }
                  onClick={() => onSelectTag(selectedTag === group.tag ? null : group.tag)}
                >
                  {headerContent}
                </button>
              )}

              <ul className={styles.rows}>
                {group.links.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onEdit={onEdit}
                    onRequestDelete={setPendingDelete}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <Modal isOpen={pendingDelete !== null} onClose={() => setPendingDelete(null)} title="Delete Link">
        <span className={styles.warningIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 9v4m0 3.5h.01M10.6 4.7 2.9 18a1.7 1.7 0 0 0 1.47 2.5h15.26A1.7 1.7 0 0 0 21.1 18L13.4 4.7a1.7 1.7 0 0 0-2.8 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className={styles.confirmText}>
          Delete <strong>{pendingDelete?.title}</strong>? This can&apos;t be undone.
        </p>
        <div className={styles.confirmActions}>
          <Button variant="ghost" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
