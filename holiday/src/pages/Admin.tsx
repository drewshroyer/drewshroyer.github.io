
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  is_approved: boolean | null;
  join_date: string | null;
};

const Admin = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if the current user is the admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      
      // Check if the user is Drew Shroyer
      if (user.email !== "drewshroyer@gmail.com") {
        toast.error("You don't have permission to access this page");
        navigate("/");
        return;
      }
      
      // If admin, fetch all profiles
      await fetchProfiles();
    };
    
    checkAdmin();
  }, [user, navigate]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('join_date', { ascending: false });
      
      if (error) throw error;
      
      setProfiles(data || []);
    } catch (error: any) {
      console.error('Error fetching profiles:', error.message);
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  const updateApprovalStatus = async (profileId: string, isApproved: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_approved: isApproved })
        .eq('id', profileId);
      
      if (error) throw error;
      
      // Update the local state
      setProfiles(profiles.map(profile => 
        profile.id === profileId ? { ...profile, is_approved: isApproved } : profile
      ));
      
      toast.success(`User ${isApproved ? 'approved' : 'denied'} successfully`);
    } catch (error: any) {
      console.error('Error updating approval status:', error.message);
      toast.error("Failed to update user status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto p-4 max-w-screen-md">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-holiday-red" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="rounded-lg border overflow-hidden mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No users have applied yet
                  </TableCell>
                </TableRow>
              ) : (
                profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>{profile.name || "N/A"}</TableCell>
                    <TableCell>{profile.email || "N/A"}</TableCell>
                    <TableCell>
                      {profile.join_date 
                        ? new Date(profile.join_date).toLocaleDateString() 
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {profile.is_approved === true ? (
                        <span className="text-green-600 font-medium">Approved</span>
                      ) : profile.is_approved === false ? (
                        <span className="text-red-600 font-medium">Denied</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {profile.is_approved === null && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateApprovalStatus(profile.id, true)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateApprovalStatus(profile.id, false)}
                          >
                            Deny
                          </Button>
                        </div>
                      )}
                      {profile.is_approved !== null && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateApprovalStatus(profile.id, null)}
                        >
                          Reset
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Admin;
