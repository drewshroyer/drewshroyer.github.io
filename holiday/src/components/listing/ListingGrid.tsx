
import { Link } from "react-router-dom";
import ListingCard from "@/components/ListingCard";
import { Loader2 } from "lucide-react";
import { formatCost } from "@/utils/formatUtils";

interface Listing {
  id: string;
  title: string;
  description: string;
  post_type: string;
  cost: string | null;
  cost_period: string | null;
  location: string | null;
  bedrooms: string | null;
  date_from: string;
  date_to: string;
  created_at: string;
  status: string;
  listing_images: {
    image_url: string;
    position: number;
  }[];
}

interface ListingGridProps {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  filteredListings: Listing[];
}

const ListingGrid = ({ listings = [], loading = false, error = null, filteredListings = [] }: ListingGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-holiday-red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading listings: {error}
      </div>
    );
  }

  if (!filteredListings || filteredListings.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No listings found</p>
        <p className="mt-2">Be the first to <Link to="/post" className="text-[#1f479c] hover:underline">post a listing</Link></p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredListings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          cost={formatCost(listing.cost, listing.cost_period)}
          imageUrl={listing.listing_images && listing.listing_images[0]?.image_url || "https://via.placeholder.com/300"}
          postType={listing.post_type}
          createdAt={listing.created_at}
          status={listing.status}
        />
      ))}
    </div>
  );
};

export default ListingGrid;
