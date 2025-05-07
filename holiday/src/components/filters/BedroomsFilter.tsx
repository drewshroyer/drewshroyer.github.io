
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FilterPopover from "./FilterPopover";

interface BedroomsFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  value: number | null;
  onChange: (value: number | null) => void;
}

const BedroomsFilter = ({ isOpen, onToggle, value, onChange }: BedroomsFilterProps) => {
  const handleClear = () => onChange(null);

  return (
    <FilterPopover
      isOpen={isOpen}
      onToggle={onToggle}
      label="Bedrooms"
      isActive={value !== null}
      onClear={handleClear}
    >
      <RadioGroup 
        value={value?.toString() || ""} 
        onValueChange={(value) => onChange(value ? parseInt(value) : null)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1" id="br1" />
          <Label htmlFor="br1">1+</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="2" id="br2" />
          <Label htmlFor="br2">2+</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3" id="br3" />
          <Label htmlFor="br3">3+</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="4" id="br4" />
          <Label htmlFor="br4">4+</Label>
        </div>
      </RadioGroup>
    </FilterPopover>
  );
};

export default BedroomsFilter;
