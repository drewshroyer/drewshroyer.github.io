
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PostTypeSelector from "@/components/post/PostTypeSelector";
import FormField from "@/components/post/FormField";
import ImageUploader from "@/components/post/ImageUploader";
import DateRangeSelector from "@/components/post/DateRangeSelector";
import ContactMethodSelector from "@/components/post/ContactMethodSelector";
import LocationField from "@/components/post/LocationField";
import BedroomsField from "@/components/post/BedroomsField";
import CostField from "@/components/post/CostField";
import { uploadImagesToStorage, saveListingImagesToDatabase, createListing } from "@/utils/supabaseUtils";

const Post = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [postType, setPostType] = useState<"listing" | "seeking">("listing");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    title: "",
    description: "",
    cost: "",
    costPeriod: "month",
    location: "",
    bedrooms: "",
    dateFrom: "",
    dateTo: "",
    contactMethod: "email" as "email" | "phone" | "instagram",
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCostPeriodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, costPeriod: value }));
  };

  const handleContactMethodChange = (value: "email" | "phone" | "instagram") => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.title || !formData.instagram) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate that at least one image is uploaded
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    
    setUploading(true);
    
    try {
      // 1. Insert the listing into the database
      const { data: listing, error: listingError } = await createListing(
        user.id,
        postType,
        formData
      );
      
      if (listingError) throw listingError;
      
      // 2. Upload the images to storage
      const imageUrls = await uploadImagesToStorage(listing.id, images);
      
      // 3. Save image URLs to the database
      await saveListingImagesToDatabase(listing.id, imageUrls);
      
      toast.success("Listing posted successfully!");
      
      // 4. Navigate to the home page after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast.error(`Error: ${error.message || 'Failed to create listing'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md pb-20">
        <div className="bg-white rounded-2xl border border-holiday-border p-8">
          <h1 className="text-2xl font-bold mb-6">POST A LISTING:</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PostTypeSelector 
              postType={postType} 
              setPostType={setPostType} 
              disabled={uploading} 
            />

            <FormField 
              id="name" 
              label="NAME:" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              disabled={uploading} 
            />

            <FormField 
              id="email" 
              label="EMAIL*:" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              disabled={uploading} 
            />

            <FormField 
              id="phone" 
              label="PHONE:" 
              value={formData.phone} 
              onChange={handleChange} 
              disabled={uploading} 
            />

            <FormField 
              id="instagram" 
              label="INSTAGRAM:" 
              value={formData.instagram} 
              onChange={handleChange} 
              placeholder="username (without @)" 
              required
              disabled={uploading} 
            />

            <FormField 
              id="title" 
              label="TITLE:" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              disabled={uploading} 
            />

            <LocationField
              value={formData.location}
              onChange={handleChange}
              disabled={uploading}
            />

            <BedroomsField
              value={formData.bedrooms}
              onChange={handleChange}
              disabled={uploading}
            />

            <FormField 
              id="description" 
              label="DESCRIPTION:" 
              value={formData.description} 
              onChange={handleChange} 
              required={false}
              disabled={uploading}
              type="textarea"
            />

            <ImageUploader
              images={images}
              setImages={setImages}
              imagePreviewUrls={imagePreviewUrls}
              setImagePreviewUrls={setImagePreviewUrls}
              disabled={uploading}
            />

            <CostField
              postType={postType}
              value={formData.cost}
              onChange={handleChange}
              timePeriod={formData.costPeriod}
              onTimePeriodChange={handleCostPeriodChange}
              disabled={uploading}
            />

            <DateRangeSelector
              dateFrom={formData.dateFrom}
              dateTo={formData.dateTo}
              onChange={handleChange}
              disabled={uploading}
            />

            <ContactMethodSelector
              value={formData.contactMethod}
              onChange={handleContactMethodChange}
              disabled={uploading}
            />

            <Button 
              type="submit" 
              className="w-full bg-holiday-red hover:bg-red-600"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Submit Listing'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Post;
