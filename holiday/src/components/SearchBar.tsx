
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onChange?: (value: string) => void;
  className?: string;
}

const SearchBar = ({ onChange, className }: SearchBarProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        placeholder="SEARCH"
        className="pl-10 py-6 border rounded-lg border-holiday-border"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
