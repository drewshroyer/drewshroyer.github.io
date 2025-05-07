
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FilterPopover from "./FilterPopover";

interface CostFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  minCost: number | null;
  maxCost: number | null;
  onMinCostChange: (value: number | null) => void;
  onMaxCostChange: (value: number | null) => void;
}

const CostFilter = ({ 
  isOpen, 
  onToggle, 
  minCost, 
  maxCost, 
  onMinCostChange, 
  onMaxCostChange 
}: CostFilterProps) => {
  const handleClear = () => {
    onMinCostChange(null);
    onMaxCostChange(null);
  };

  return (
    <FilterPopover
      isOpen={isOpen}
      onToggle={onToggle}
      label="Cost"
      isActive={!!(minCost || maxCost)}
      onClear={handleClear}
    >
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="minCost">Min</Label>
          <Label htmlFor="maxCost">Max</Label>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            id="minCost"
            type="number"
            min="0"
            placeholder="Min"
            value={minCost || ""}
            onChange={(e) => onMinCostChange(e.target.value ? parseFloat(e.target.value) : null)}
          />
          <span>-</span>
          <Input
            id="maxCost"
            type="number"
            min="0"
            placeholder="Max"
            value={maxCost || ""}
            onChange={(e) => onMaxCostChange(e.target.value ? parseFloat(e.target.value) : null)}
          />
        </div>
      </div>
    </FilterPopover>
  );
};

export default CostFilter;
