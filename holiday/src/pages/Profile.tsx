
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Upload, User, Edit, Save, MapPin, Lock } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListings from "@/components/profile/UserListings";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, updatePassword, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    instagram_handle: "",
    home_location: "",
    join_date: "",
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      instagram_handle: "",
      home_location: "",
    }
  });

  const passwordForm = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Fetch user profile data
    fetchProfile(user.id);
  }, [navigate, user]);

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) throw profileError;
      
      if (profileData) {
        setProfile({
          name: profileData.name || "",
          email: profileData.email || "",
          instagram_handle: profileData.instagram_handle || "",
          home_location: profileData.home_location || "",
          join_date: new Date(profileData.join_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        });
        
        form.reset({
          name: profileData.name || "",
          email: profileData.email || "",
          instagram_handle: profileData.instagram_handle || "",
          home_location: profileData.home_location || "",
        });
        
        // Get avatar if exists
        if (profileData.avatar_url) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(profileData.avatar_url);
          
          setAvatarUrl(publicUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${user?.id}/${Date.now()}.${fileExt}`;
    
    setIsLoading(true);
    try {
      // Upload the file to Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // Update the user profile with the new avatar URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user?.id);
      
      if (updateError) throw updateError;
      
      setAvatarUrl(publicUrl);
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async (values: any) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: values.name,
          email: values.email,
          instagram_handle: values.instagram_handle,
          home_location: values.home_location,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfile({
        ...profile,
        name: values.name,
        email: values.email,
        instagram_handle: values.instagram_handle,
        home_location: values.home_location,
      });
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      passwordForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match"
      });
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(values.password);
      setShowPasswordForm(false);
      passwordForm.reset();
    } catch (error) {
      // Error is handled in the updatePassword function
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If we're already editing, submit the form
      form.handleSubmit(handleSaveProfile)();
    } else {
      // Otherwise, enter edit mode
      setIsEditing(true);
    }
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
    if (!showPasswordForm) {
      passwordForm.reset();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="border border-holiday-border rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Profile</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleEditMode}
                  disabled={isLoading}
                  className="flex gap-1.5 items-center"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-holiday-border">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="Profile" />
                      ) : (
                        <AvatarFallback>
                          <User className="h-10 w-10" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label htmlFor="avatar-upload" className="cursor-pointer">
                          <div className="rounded-full bg-holiday-red p-1 text-white">
                            <Upload className="h-4 w-4" />
                          </div>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isLoading}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Your email" type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="home_location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Home Location</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                <Input {...field} placeholder="Your location" className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instagram_handle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Instagram Handle</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">@</span>
                                <Input {...field} placeholder="username" className="pl-7" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                ) : (
                  <>
                    <div>
                      <p className="font-medium">Name:</p>
                      <p>{profile.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p>{profile.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Home Location:</p>
                      <p>{profile.home_location || "Not specified"}</p>
                    </div>
                    {profile.instagram_handle && (
                      <div>
                        <p className="font-medium">Instagram:</p>
                        <a 
                          href={`https://instagram.com/${profile.instagram_handle}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-holiday-red hover:underline"
                        >
                          <Instagram className="h-4 w-4 mr-1" />
                          @{profile.instagram_handle}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Member Since:</p>
                      <p>{profile.join_date}</p>
                    </div>
                  </>
                )}
                
                {!isEditing && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      onClick={togglePasswordForm}
                      className="flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      {showPasswordForm ? "Cancel" : "Change Password"}
                    </Button>
                  </div>
                )}
                
                {showPasswordForm && !isEditing && (
                  <div className="mt-4 border border-holiday-border p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Update Password</h3>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" placeholder="••••••••" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" placeholder="••••••••" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="submit"
                          className="bg-holiday-red hover:bg-red-600"
                          disabled={isLoading}
                        >
                          Update Password
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button onClick={signOut} className="bg-holiday-red hover:bg-red-600" disabled={isLoading}>
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="listings">
            <Card className="border border-holiday-border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">My Listings</CardTitle>
              </CardHeader>
              <CardContent>
                {user && <UserListings userId={user.id} />}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
