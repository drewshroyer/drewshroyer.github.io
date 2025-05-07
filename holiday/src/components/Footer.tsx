
import { ThemeToggle } from './theme/ThemeToggle';

const Footer = () => {
  return (
    <footer className="mt-auto p-6 border-t border-card-border">
      <div className="container-holiday flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Holiday. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
