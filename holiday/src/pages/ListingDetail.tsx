
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import ListingImageCarousel from "@/components/listing/ListingImageCarousel";
import ListingHeader from "@/components/listing/ListingHeader";
import ListingDetails from "@/components/listing/ListingDetails";
import ContactInfo from "@/components/listing/ContactInfo";
import ListingLoading from "@/components/listing/ListingLoading";
import ListingError from "@/components/listing/ListingError";
import ListingStatus from "@/components/listing/ListingStatus";
import { formatCost, formatDate } from "@/utils/formatUtils";
import { getTimeAgo } from "@/utils/timeUtils";
import { useAuth } from "@/context/AuthContext";

type ListingDetail = {
  id: string;
  title: string;
  description: string;
  cost: string | null;
  cost_period: string | null;
  location: string | null;
  bedrooms: string | null;
  date_from: string;
  date_to: string;
  name: string;
  email: string;
  phone: string | null;
  instagram: string | null;
  contact_method: string;
  post_type: string;
  created_at: string;
  user_id: string;
  status: string;
  listing_images: {
    id: string;
    image_url: string;
    position: number;
  }[];
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchListingDetail = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('listings')
          .select(`
            id, 
            title, 
            description, 
            post_type,
            cost,
            cost_period,
            location,
            bedrooms,
            date_from,
            date_to,
            name,
            email,
            phone,
            instagram,
            contact_method,
            created_at,
            user_id,
            status,
            listing_images (id, image_url, position)
          `)
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setListing(data);
          // Check if current user is the owner of this listing
          setIsOwner(user?.id === data.user_id);
        }
      } catch (err: any) {
        console.error('Error fetching listing:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListingDetail();
  }, [id, user]);

  if (loading) {
    return <ListingLoading />;
  }

  if (error || !listing) {
    return <ListingError error={error} />;
  }

  // Format dates
  const formattedDateFrom = formatDate(listing.date_from);
  const formattedDateTo = formatDate(listing.date_to);

  // Format cost
  const formattedCost = formatCost(listing.cost, listing.cost_period);
  
  // Format time ago
  const timeAgo = getTimeAgo(listing.created_at);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md pb-16">
        <Link to="/" className="text-holiday-red hover:underline mb-4 inline-block">
          &larr; Back to listings
        </Link>

        <div className="bg-white rounded-2xl border border-holiday-border overflow-hidden">
          {/* Image Carousel */}
          <ListingImageCarousel images={listing.listing_images} title={listing.title} />

          <div className="p-6">
            {/* Status and Posted Time */}
            <div className="flex justify-between items-center mb-2">
              <ListingStatus status={listing.status} />
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            
            {/* Title and Type */}
            <ListingHeader 
              title={listing.title} 
              postType={listing.post_type} 
              formattedCost={formattedCost} 
            />
            
            {/* Listing Details */}
            <ListingDetails 
              location={listing.location}
              bedrooms={listing.bedrooms}
              formattedDateFrom={formattedDateFrom}
              formattedDateTo={formattedDateTo}
              description={listing.description}
            />

            {/* Contact Information */}
            <ContactInfo 
              name={listing.name}
              email={listing.email}
              phone={listing.phone}
              instagram={listing.instagram}
              contactMethod={listing.contact_method}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;
