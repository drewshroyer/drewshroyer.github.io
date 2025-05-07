
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const LocationField = ({ value, onChange, disabled }: LocationFieldProps) => {
  return (
    <div>
      <label htmlFor="location" className="block font-medium mb-1">
        LOCATION:
      </label>
      <Input
        id="location"
        name="location"
        value={value}
        onChange={onChange}
        className="w-full border border-holiday-border rounded-lg"
        placeholder="e.g. New York, NY"
        required
        disabled={disabled}
      />
    </div>
  );
};

export default LocationField;
