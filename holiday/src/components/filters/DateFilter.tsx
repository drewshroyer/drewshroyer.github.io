
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FilterPopover from "./FilterPopover";

interface DateFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

const DateFilter = ({ 
  isOpen, 
  onToggle, 
  dateFrom, 
  dateTo, 
  onDateFromChange, 
  onDateToChange 
}: DateFilterProps) => {
  const handleClear = () => {
    onDateFromChange("");
    onDateToChange("");
  };

  return (
    <FilterPopover
      isOpen={isOpen}
      onToggle={onToggle}
      label="Dates"
      isActive={!!(dateFrom || dateTo)}
      onClear={handleClear}
    >
      <div className="space-y-2">
        <Label htmlFor="dateFrom">From</Label>
        <Input
          id="dateFrom"
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateTo">To</Label>
        <Input
          id="dateTo"
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
        />
      </div>
    </FilterPopover>
  );
};

export default DateFilter;
