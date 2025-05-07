
/**
 * Formats a timestamp to display how long ago it was created
 */
export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
};

/**
 * Gets the appropriate color for listing status badges
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'bg-green-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'unavailable':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};
