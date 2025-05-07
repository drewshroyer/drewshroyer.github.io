
import { Input } from "@/components/ui/input";

interface BedroomsFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const BedroomsField = ({ value, onChange, disabled }: BedroomsFieldProps) => {
  return (
    <div>
      <label htmlFor="bedrooms" className="block font-medium mb-1">
        BEDROOMS:
      </label>
      <Input
        id="bedrooms"
        name="bedrooms"
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={onChange}
        className="w-full border border-holiday-border rounded-lg"
        placeholder="e.g. 2"
        disabled={disabled}
      />
    </div>
  );
};

export default BedroomsField;
