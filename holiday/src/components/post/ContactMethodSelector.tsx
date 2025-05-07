
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ContactMethodSelectorProps {
  value: "email" | "phone" | "instagram";
  onChange: (value: "email" | "phone" | "instagram") => void;
  disabled: boolean;
}

const ContactMethodSelector = ({ value, onChange, disabled }: ContactMethodSelectorProps) => {
  return (
    <div>
      <p className="block font-medium mb-2">PREFERRED CONTACT METHOD:</p>
      <RadioGroup 
        defaultValue="email" 
        className="flex gap-4"
        onValueChange={(value) => onChange(value as "email" | "phone" | "instagram")}
        disabled={disabled}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email" />
          <Label htmlFor="email">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="phone" id="phone" />
          <Label htmlFor="phone">Phone</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="instagram" id="instagram" />
          <Label htmlFor="instagram">Instagram</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ContactMethodSelector;
