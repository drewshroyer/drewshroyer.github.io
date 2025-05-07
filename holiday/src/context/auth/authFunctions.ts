
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    if (error) throw error;
    
    toast.success("Signup successful! Please check your email for verification.");
  } catch (error: any) {
    toast.error(`Error signing up: ${error.message}`);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    
    toast.success("Login successful!");
    return true;
  } catch (error: any) {
    toast.error(`Error signing in: ${error.message}`);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    return true;
  } catch (error: any) {
    toast.error(`Error signing out: ${error.message}`);
    throw error;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    
    toast.success("Password updated successfully");
    return true;
  } catch (error: any) {
    toast.error(`Error updating password: ${error.message}`);
    throw error;
  }
};
