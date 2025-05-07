
import { Link } from "react-router-dom";
import { useTheme } from "./theme/ThemeProvider";

const Logo = () => {
  const { theme } = useTheme();
  
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-center h-12">
        <img 
          src="/lovable-uploads/a86394b7-6f58-4296-9ca7-42d4fd44ecfd.png" 
          alt="HOLIDAY logo" 
          className="h-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
