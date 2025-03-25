export const getRelativeTime = (timestamp) => {
  if (!timestamp) return '-';

  const now = new Date();
  const past = new Date(timestamp);
  past.setHours(past.getHours() + 9);

  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return '방금 전';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}일 전`;
  if (diffInDays < 365) return `${past.getMonth() + 1}월 ${past.getDate()}일`;

  return `${past.getFullYear()}년 ${past.getMonth() + 1}월 ${past.getDate()}일`; // 1년 이상
};
