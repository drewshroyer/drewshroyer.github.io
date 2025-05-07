
import { getStatusColor } from "@/utils/timeUtils";

interface ListingStatusProps {
  status: string;
  className?: string;
}

const ListingStatus = ({ status, className = "" }: ListingStatusProps) => {
  const statusColor = getStatusColor(status);
  
  return (
    <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${statusColor} ${className}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default ListingStatus;
