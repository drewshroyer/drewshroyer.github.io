
import { Input } from "@/components/ui/input";
import FilterPopover from "./FilterPopover";

interface LocationFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  value: string;
  onChange: (value: string) => void;
}

const LocationFilter = ({ isOpen, onToggle, value, onChange }: LocationFilterProps) => {
  const handleClear = () => onChange("");

  return (
    <FilterPopover
      isOpen={isOpen}
      onToggle={onToggle}
      label="Location"
      isActive={!!value}
      onClear={handleClear}
    >
      <Input
        placeholder="Enter location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FilterPopover>
  );
};

export default LocationFilter;
