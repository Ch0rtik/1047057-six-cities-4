
export default function formatReviewDate(date: string) {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
  return formatter.format(new Date(date));
}
