
import { useState } from "react";
import FilterButton from "@/components/FilterButton";
import LocationFilter from "./LocationFilter";
import DateFilter from "./DateFilter";
import BedroomsFilter from "./BedroomsFilter";
import CostFilter from "./CostFilter";

interface FiltersProps {
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  dateFromFilter: string;
  setDateFromFilter: (value: string) => void;
  dateToFilter: string;
  setDateToFilter: (value: string) => void;
  bedroomsFilter: number | null;
  setBedroomsFilter: (value: number | null) => void;
  costMinFilter: number | null;
  setCostMinFilter: (value: number | null) => void;
  costMaxFilter: number | null;
  setCostMaxFilter: (value: number | null) => void;
  showingSeekingOnly: boolean;
  setShowingSeekingOnly: (value: boolean) => void;
}

const Filters = ({
  locationFilter,
  setLocationFilter,
  dateFromFilter,
  setDateFromFilter,
  dateToFilter,
  setDateToFilter,
  bedroomsFilter,
  setBedroomsFilter,
  costMinFilter,
  setCostMinFilter,
  costMaxFilter,
  setCostMaxFilter,
  showingSeekingOnly,
  setShowingSeekingOnly
}: FiltersProps) => {
  // Track which filter popover is currently open
  const [activeFilterPopover, setActiveFilterPopover] = useState<string | null>(null);
  
  const toggleFilter = (filterName: string) => {
    // If this filter is already open, close it. Otherwise, open it and close any other open filter
    setActiveFilterPopover(prevActive => prevActive === filterName ? null : filterName);
  };

  const toggleSeekingFilter = () => {
    setShowingSeekingOnly(!showingSeekingOnly);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <LocationFilter 
        isOpen={activeFilterPopover === 'location'} 
        onToggle={() => toggleFilter('location')}
        value={locationFilter}
        onChange={setLocationFilter}
      />

      <DateFilter 
        isOpen={activeFilterPopover === 'dates'} 
        onToggle={() => toggleFilter('dates')}
        dateFrom={dateFromFilter}
        dateTo={dateToFilter}
        onDateFromChange={setDateFromFilter}
        onDateToChange={setDateToFilter}
      />

      <BedroomsFilter 
        isOpen={activeFilterPopover === 'bedrooms'} 
        onToggle={() => toggleFilter('bedrooms')}
        value={bedroomsFilter}
        onChange={setBedroomsFilter}
      />

      <CostFilter 
        isOpen={activeFilterPopover === 'cost'} 
        onToggle={() => toggleFilter('cost')}
        minCost={costMinFilter}
        maxCost={costMaxFilter}
        onMinCostChange={setCostMinFilter}
        onMaxCostChange={setCostMaxFilter}
      />

      <FilterButton 
        label="Seeking" 
        active={showingSeekingOnly} 
        onClick={toggleSeekingFilter}
        className="flex-grow" 
      />
    </div>
  );
};

export default Filters;
