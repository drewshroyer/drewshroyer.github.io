
import { Instagram, Mail, Phone } from "lucide-react";

interface ContactInfoProps {
  name: string;
  email: string;
  phone: string | null;
  instagram: string | null;
  contactMethod: string;
}

const ContactInfo = ({ name, email, phone, instagram, contactMethod }: ContactInfoProps) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold mb-2">Contact {name}</h2>
      <div className="space-y-3">
        <p className="text-sm text-gray-500">
          Preferred contact method: 
          <span className="font-medium ml-1">
            {contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}
          </span>
        </p>
        
        <div className="flex flex-col gap-3">
          {email && (
            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-gray-800 hover:text-holiday-red"
            >
              <Mail size={18} />
              <span>{email}</span>
            </a>
          )}
          
          {phone && (
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-gray-800 hover:text-holiday-red"
            >
              <Phone size={18} />
              <span>{phone}</span>
            </a>
          )}
          
          {instagram && (
            <a 
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:text-holiday-red"
            >
              <Instagram size={18} />
              <span>@{instagram}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
