
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getTimeAgo } from "@/utils/timeUtils";
import ListingStatus from "./listing/ListingStatus";

interface ListingCardProps {
  id: string;
  title: string;
  cost?: string | null;
  imageUrl: string;
  postType: string;
  className?: string;
  createdAt: string;
  status: string;
  showStatus?: boolean;
}

const ListingCard = ({ 
  id, 
  title, 
  cost, 
  imageUrl, 
  postType, 
  className,
  createdAt,
  status,
  showStatus = true
}: ListingCardProps) => {
  const timeAgo = getTimeAgo(createdAt);

  return (
    <Link 
      to={`/listing/${id}`}
      className={cn(
        "rounded-3xl overflow-hidden border border-holiday-border relative group cursor-pointer block", 
        className
      )}
    >
      <div className="aspect-square w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {postType === "seeking" && (
        <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
          Seeking
        </div>
      )}
      {showStatus && status !== "available" && (
        <div className="absolute top-3 right-3">
          <ListingStatus status={status} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm">
        <p className="text-lg font-medium">{title}</p>
        {cost && <p className="text-holiday-red font-medium">{cost}</p>}
        <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
      </div>
    </Link>
  );
};

export default ListingCard;
