
import { Bed, MapPin } from "lucide-react";

interface ListingDetailsProps {
  location: string | null;
  bedrooms: string | null;
  formattedDateFrom: string;
  formattedDateTo: string;
  description: string;
}

const ListingDetails = ({ 
  location, 
  bedrooms, 
  formattedDateFrom, 
  formattedDateTo, 
  description 
}: ListingDetailsProps) => {
  return (
    <>
      {/* Location and Bedrooms */}
      <div className="flex flex-col gap-2 mb-4">
        {location && (
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} />
            <span>{location}</span>
          </div>
        )}
        
        {bedrooms && (
          <div className="flex items-center gap-2 text-gray-700">
            <Bed size={18} />
            <span>{bedrooms} {parseInt(bedrooms) === 1 ? 'bedroom' : 'bedrooms'}</span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Availability</h2>
        <p className="text-gray-700">
          {formattedDateFrom} to {formattedDateTo}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">About this place</h2>
        <div className="text-gray-700 whitespace-pre-wrap">{description}</div>
      </div>
    </>
  );
};

export default ListingDetails;
