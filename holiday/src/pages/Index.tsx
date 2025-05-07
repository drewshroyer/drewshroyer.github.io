
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ListingGrid from '@/components/listing/ListingGrid';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/filters/Filters';
import { useQuery } from '@tanstack/react-query';

// Define the Listing interface
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

const Index = () => {
  // State for filters
  const [locationFilter, setLocationFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState<number | null>(null);
  const [costMinFilter, setCostMinFilter] = useState<number | null>(null);
  const [costMaxFilter, setCostMaxFilter] = useState<number | null>(null);
  const [showingSeekingOnly, setShowingSeekingOnly] = useState(false);

  // Fetch listings
  const {
    data: listings = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const response = await fetch(
        'https://jzthkxyooupvsjbhuywl.supabase.co/rest/v1/listings?select=id,title,description,post_type,cost,cost_period,location,bedrooms,date_from,date_to,created_at,status,listing_images(image_url,position)&order=created_at.desc',
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6dGhreHlvb3VwdnNqYmh1eXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NjQyNzMsImV4cCI6MjA2MjE0MDI3M30.K68KwzWVXNh0ZGmdcAv4Iql_1tYMUpLwU6Fy_FRy2TI',
          }
        }
      );
      return response.json() as Promise<Listing[]>;
    }
  });

  // Apply filters to listings
  const filteredListings = listings.filter(listing => {
    // Location filter
    if (locationFilter && listing.location) {
      if (!listing.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
    }

    // Date filters
    if (dateFromFilter && new Date(dateFromFilter) > new Date(listing.date_from)) {
      return false;
    }
    
    if (dateToFilter && new Date(dateToFilter) < new Date(listing.date_to)) {
      return false;
    }

    // Bedrooms filter
    if (bedroomsFilter !== null && listing.bedrooms) {
      if (parseInt(listing.bedrooms) < bedroomsFilter) {
        return false;
      }
    }

    // Cost filters
    if (costMinFilter !== null && listing.cost) {
      const cost = parseFloat(listing.cost.replace(/[^0-9.]/g, ''));
      if (!isNaN(cost) && cost < costMinFilter) {
        return false;
      }
    }
    
    if (costMaxFilter !== null && listing.cost) {
      const cost = parseFloat(listing.cost.replace(/[^0-9.]/g, ''));
      if (!isNaN(cost) && cost > costMaxFilter) {
        return false;
      }
    }

    // Post type filter (seeking only)
    if (showingSeekingOnly && listing.post_type !== 'seeking') {
      return false;
    }

    return true;
  });

  return (
    <Layout>
      <div className="container-holiday py-8">
        <SearchBar />
        <Filters
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          dateFromFilter={dateFromFilter}
          setDateFromFilter={setDateFromFilter}
          dateToFilter={dateToFilter}
          setDateToFilter={setDateToFilter}
          bedroomsFilter={bedroomsFilter}
          setBedroomsFilter={setBedroomsFilter}
          costMinFilter={costMinFilter}
          setCostMinFilter={setCostMinFilter}
          costMaxFilter={costMaxFilter}
          setCostMaxFilter={setCostMaxFilter}
          showingSeekingOnly={showingSeekingOnly}
          setShowingSeekingOnly={setShowingSeekingOnly}
        />
        <div className="mt-6">
          <ListingGrid
            listings={listings}
            loading={isLoading}
            error={error instanceof Error ? error.message : error ? String(error) : null}
            filteredListings={filteredListings}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
