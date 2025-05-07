
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { formatCost } from "@/utils/formatUtils";
import { toast } from "sonner";
import ListingCard from "../ListingCard";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import ListingStatus from "../listing/ListingStatus";

interface UserListingsProps {
  userId: string;
}

const UserListings = ({ userId }: UserListingsProps) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's listings
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const { data, error } = await supabase
          .from('listings')
          .select(`
            id, 
            title,
            cost,
            cost_period,
            post_type,
            created_at,
            status,
            listing_images (image_url, position)
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setListings(data || []);
      } catch (err: any) {
        console.error('Error fetching user listings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserListings();
    }
  }, [userId]);

  const updateListingStatus = async (listingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ status })
        .eq('id', listingId);
      
      if (error) throw error;
      
      // Update local state
      setListings(listings.map(listing => 
        listing.id === listingId ? { ...listing, status } : listing
      ));
      
      toast.success(`Listing marked as ${status}`);
    } catch (err: any) {
      console.error('Error updating listing status:', err);
      toast.error(`Failed to update status: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-holiday-red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading your listings: {error}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">You haven't created any listings yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your Listings</h2>
      
      <div className="space-y-6">
        {listings.map((listing) => (
          <div key={listing.id} className="border border-holiday-border rounded-xl p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Listing Card (smaller version) */}
              <div className="w-full md:w-1/3">
                <ListingCard 
                  id={listing.id}
                  title={listing.title}
                  cost={formatCost(listing.cost, listing.cost_period)}
                  imageUrl={listing.listing_images[0]?.image_url || "https://via.placeholder.com/300"}
                  postType={listing.post_type}
                  createdAt={listing.created_at}
                  status={listing.status}
                  showStatus={false}
                  className="h-full"
                />
              </div>
              
              {/* Listing Management */}
              <div className="w-full md:w-2/3 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{listing.title}</h3>
                  <ListingStatus status={listing.status} />
                </div>
                
                <div>
                  <p className="text-sm mb-2">Update listing status:</p>
                  <ToggleGroup type="single" value={listing.status}>
                    <ToggleGroupItem 
                      value="available" 
                      onClick={() => updateListingStatus(listing.id, "available")}
                      className="text-sm"
                    >
                      <Check className="h-4 w-4 mr-1" /> Available
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="pending" 
                      onClick={() => updateListingStatus(listing.id, "pending")}
                      className="text-sm"
                    >
                      <Loader2 className="h-4 w-4 mr-1" /> Pending
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="unavailable" 
                      onClick={() => updateListingStatus(listing.id, "unavailable")}
                      className="text-sm"
                    >
                      <X className="h-4 w-4 mr-1" /> Unavailable
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => {
                      // Future enhancement: implement edit functionality
                      toast.info("Edit functionality coming soon");
                    }}
                  >
                    Edit Listing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListings;
