
import { Session, User } from "@supabase/supabase-js";

export type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
  is_approved: boolean | null;
  home_location: string | null;
};

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
};
