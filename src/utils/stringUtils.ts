export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

export function limitText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength) : text;
} 