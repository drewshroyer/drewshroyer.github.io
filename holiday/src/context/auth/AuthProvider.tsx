
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType } from "./types";
import { useProfileFetch } from "./useProfileFetch";
import { signIn, signOut, signUp, updatePassword } from "./authFunctions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const {
    userProfile,
    setUserProfile,
    isAdmin,
    setIsAdmin,
    fetchUserProfile
  } = useProfileFetch();

  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Store login state in localStorage for Header component
        if (session) {
          localStorage.setItem("isLoggedIn", "true");
          
          // Fetch user profile data
          if (session.user) {
            fetchUserProfile(session.user.id);
          }
        } else {
          localStorage.removeItem("isLoggedIn");
          setUserProfile(null);
          setIsAdmin(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Store login state in localStorage for Header component
      if (session) {
        localStorage.setItem("isLoggedIn", "true");
        
        // Fetch user profile data
        if (session.user) {
          fetchUserProfile(session.user.id);
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to route changes to enforce restrictions
  useEffect(() => {
    if (loading) return;
    
    // If we have profile data, enforce approval restrictions
    if (userProfile) {
      if (userProfile.is_approved === false || userProfile.is_approved === null) {
        if (location.pathname !== '/login' && 
            location.pathname !== '/waiting-approval') {
          navigate('/waiting-approval');
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, userProfile, loading]);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      // Error is handled in the signIn function
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      await signUp(email, password, name);
    } catch (error) {
      // Error is handled in the signUp function
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      // Error is handled in the signOut function
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (newPassword: string) => {
    setLoading(true);
    try {
      await updatePassword(newPassword);
    } catch (error) {
      // Error is handled in the updatePassword function
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      userProfile,
      signUp: handleSignUp,
      signIn: handleSignIn,
      signOut: handleSignOut,
      updatePassword: handleUpdatePassword,
      loading,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
