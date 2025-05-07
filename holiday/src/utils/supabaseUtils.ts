
import { nanoid } from "nanoid";
import { supabase } from "@/integrations/supabase/client";

/**
 * Upload images to Supabase storage
 */
export const uploadImagesToStorage = async (listingId: string, images: File[]): Promise<string[]> => {
  try {
    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${listingId}/${index}-${nanoid()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('listing_images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('listing_images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    });
    
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

/**
 * Save listing image metadata to database
 */
export const saveListingImagesToDatabase = async (listingId: string, imageUrls: string[]) => {
  try {
    const imageData = imageUrls.map((url, index) => ({
      listing_id: listingId,
      image_url: url,
      position: index
    }));
    
    const { error } = await supabase
      .from('listing_images')
      .insert(imageData);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error saving image data:', error);
    throw error;
  }
};

/**
 * Create a new listing in the database
 */
export const createListing = async (
  userId: string, 
  postType: string, 
  formData: {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    title: string;
    description: string;
    cost: string;
    costPeriod: string;
    location: string;
    bedrooms: string;
    dateFrom: string;
    dateTo: string;
    contactMethod: "email" | "phone" | "instagram";
  }
) => {
  return await supabase
    .from('listings')
    .insert({
      user_id: userId,
      post_type: postType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      instagram: formData.instagram || null,
      title: formData.title,
      description: formData.description,
      cost: formData.cost || null,
      cost_period: formData.costPeriod || "month",
      location: formData.location || null,
      bedrooms: formData.bedrooms || null,
      date_from: formData.dateFrom,
      date_to: formData.dateTo,
      contact_method: formData.contactMethod
    })
    .select()
    .single();
};
