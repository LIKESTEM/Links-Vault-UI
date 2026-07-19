const TAG_PALETTE = ['#4cc9f0', '#4361ee', '#7209b7', '#f72585', '#4895ef', '#b5179e'];

export function getTagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i += 1) {
    hash = (hash << 5) - hash + tag.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TAG_PALETTE.length;
  return TAG_PALETTE[index];
}
