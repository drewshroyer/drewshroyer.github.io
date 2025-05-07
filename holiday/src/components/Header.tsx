
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  const isLoggedIn = !!user;

  return (
    <header className="p-4 flex justify-between items-center border-b border-card-border bg-card-bg">
      <Logo />
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {location.pathname !== "/post" && (
              <Link to="/post">
                <Button variant="outline" className="font-medium bg-transparent text-holiday-red border-holiday-red hover:bg-holiday-red hover:text-white">
                  + POST
                </Button>
              </Link>
            )}
            <Link to="/profile" className="font-medium text-holiday-red">
              PROFILE
            </Link>
            {isAdmin && (
              <Link to="/admin" className="font-medium text-holiday-red">
                ADMIN
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="font-medium text-holiday-red">
              LOGIN
            </Link>
            <Link to="/apply">
              <Button variant="outline" className="font-medium bg-transparent text-holiday-red border-holiday-red hover:bg-holiday-red hover:text-white">
                APPLY
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
