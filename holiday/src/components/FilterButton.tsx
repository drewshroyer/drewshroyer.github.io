
import { Toggle } from "./ui/toggle";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const FilterButton = ({ label, active = false, onClick, className }: FilterButtonProps) => {
  return (
    <Toggle
      pressed={active}
      onPressedChange={onClick}
      className={cn(
        "border border-holiday-border rounded-lg px-4 py-2 text-sm",
        active ? "bg-holiday-gray data-[state=on]:bg-holiday-gray" : "bg-white",
        "data-[state=on]:text-foreground", // Ensure text remains visible when active
        className
      )}
      aria-label={`Toggle ${label} filter`}
    >
      {label}
    </Toggle>
  );
};

export default FilterButton;
