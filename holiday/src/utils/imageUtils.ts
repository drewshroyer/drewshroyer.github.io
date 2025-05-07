
import { toast } from "sonner";

/**
 * Filter and validate image files
 */
export const validateImageFiles = (files: File[], currentImages: File[]): File[] => {
  const allowedFiles = files.filter(file => {
    const isValidType = file.type.startsWith('image/');
    if (!isValidType) {
      toast.error(`${file.name} is not a valid image file.`);
    }
    return isValidType;
  });
  
  if (currentImages.length + allowedFiles.length > 6) {
    toast.error("You can upload a maximum of 6 images");
    return [];
  }
  
  return allowedFiles;
};

/**
 * Create preview URLs for uploaded images
 */
export const createImagePreviews = (files: File[]): string[] => {
  return files.map(file => URL.createObjectURL(file));
};

/**
 * Revoke object URL to prevent memory leaks
 */
export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};
