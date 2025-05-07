
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

export const useProfileFetch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, is_approved, home_location')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      setUserProfile(data as UserProfile);
      
      // Check if user is admin (Drew Shroyer)
      setIsAdmin(data?.email === "drewshroyer@gmail.com");
      
      // Redirect unapproved users
      if (data && data.is_approved === false && 
          location.pathname !== '/login' && 
          location.pathname !== '/waiting-approval') {
        navigate('/waiting-approval');
      }
      
      // Redirect users with pending approval
      if (data && data.is_approved === null && 
          location.pathname !== '/login' && 
          location.pathname !== '/waiting-approval') {
        navigate('/waiting-approval');
      }
      
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  return {
    userProfile,
    setUserProfile,
    isAdmin,
    setIsAdmin,
    fetchUserProfile
  };
};
