
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  type?: "input" | "textarea";
  maxLength?: number;
}

const FormField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  required = false, 
  disabled = false, 
  placeholder = "",
  type = "input",
  maxLength
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block font-medium mb-1">
        {label}
        {maxLength && (
          <span className="text-gray-500 text-sm ml-1">
            ({value.length}/{maxLength})
          </span>
        )}
      </label>
      {type === "input" ? (
        <Input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full border border-holiday-border rounded-lg"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
        />
      ) : (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full border border-holiday-border rounded-lg"
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
        />
      )}
    </div>
  );
};

export default FormField;
