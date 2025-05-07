
import { Input } from "@/components/ui/input";

interface DateRangeSelectorProps {
  dateFrom: string;
  dateTo: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const DateRangeSelector = ({ dateFrom, dateTo, onChange, disabled }: DateRangeSelectorProps) => {
  return (
    <div>
      <p className="block font-medium mb-1">DATES:</p>
      <div className="flex gap-4 items-center">
        <Input
          id="dateFrom"
          name="dateFrom"
          type="date"
          value={dateFrom}
          onChange={onChange}
          className="border border-holiday-border rounded-lg"
          required
          disabled={disabled}
        />
        <span>TO</span>
        <Input
          id="dateTo"
          name="dateTo"
          type="date"
          value={dateTo}
          onChange={onChange}
          className="border border-holiday-border rounded-lg"
          required
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
