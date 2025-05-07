
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CostFieldProps {
  postType: "listing" | "seeking";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timePeriod: string;
  onTimePeriodChange: (value: string) => void;
  disabled: boolean;
}

const CostField = ({ 
  postType, 
  value, 
  onChange, 
  timePeriod, 
  onTimePeriodChange, 
  disabled 
}: CostFieldProps) => {
  const fieldLabel = postType === "seeking" ? "BUDGET:" : "COST:";
  
  return (
    <div>
      <label htmlFor="cost" className="block font-medium mb-1">
        {fieldLabel}
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
          <Input
            id="cost"
            name="cost"
            value={value}
            onChange={onChange}
            className="pl-8 w-full border border-holiday-border rounded-lg"
            placeholder="e.g. 1500"
            disabled={disabled}
          />
        </div>
        
        <Select 
          value={timePeriod} 
          onValueChange={onTimePeriodChange} 
          disabled={disabled}
        >
          <SelectTrigger className="w-[130px] border border-holiday-border rounded-lg">
            <SelectValue placeholder="/ month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="night">/ night</SelectItem>
            <SelectItem value="week">/ week</SelectItem>
            <SelectItem value="month">/ month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CostField;
