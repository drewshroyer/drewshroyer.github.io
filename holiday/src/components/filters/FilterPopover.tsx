
import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FilterButton from "@/components/FilterButton";
import { Button } from "@/components/ui/button";

interface FilterPopoverProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  isActive: boolean;
  onClear: () => void;
  children: ReactNode;
}

const FilterPopover = ({ 
  isOpen, 
  onToggle, 
  label, 
  isActive, 
  onClear, 
  children 
}: FilterPopoverProps) => {
  return (
    <Popover open={isOpen} onOpenChange={(open) => {
      // Only call onToggle when closing, not when opening
      // This prevents the immediate open/close cycle
      if (!open) {
        onToggle();
      }
    }}>
      <PopoverTrigger asChild>
        <div onClick={(e) => {
          // Prevent the default to avoid immediate toggle
          e.preventDefault();
          if (!isOpen) {
            onToggle();
          }
        }}>
          <FilterButton 
            label={label} 
            active={isActive} 
            // We don't need onClick here as it's handled by the div
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium">Filter by {label.toLowerCase()}</h4>
          {children}
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => {
                onClear();
                onToggle();
              }}
            >
              Clear
            </Button>
            <Button onClick={onToggle}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
