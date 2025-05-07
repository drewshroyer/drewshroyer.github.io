
import { useState } from "react";
import { X } from "lucide-react";
import { validateImageFiles, createImagePreviews, revokeObjectURL } from "@/utils/imageUtils";

interface ImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviewUrls: string[];
  setImagePreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
}

const ImageUploader = ({ 
  images, 
  setImages, 
  imagePreviewUrls, 
  setImagePreviewUrls,
  disabled 
}: ImageUploaderProps) => {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    // Convert FileList to Array before passing
    const fileArray = Array.from(e.target.files);
    const allowedFiles = validateImageFiles(fileArray, images);
    if (allowedFiles.length === 0) return;
    
    setImages(prev => [...prev, ...allowedFiles]);
    
    const newPreviewUrls = createImagePreviews(allowedFiles);
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    revokeObjectURL(imagePreviewUrls[index]);
    const newPreviewUrls = [...imagePreviewUrls];
    newPreviewUrls.splice(index, 1);
    setImagePreviewUrls(newPreviewUrls);
  };

  return (
    <div>
      <p className="block font-medium mb-1">
        INSERT PHOTOS (1 required, 6 max):
      </p>
      <div className="grid grid-cols-3 gap-4 mb-2">
        {imagePreviewUrls.map((url, index) => (
          <div key={index} className="aspect-square rounded-xl border border-holiday-border overflow-hidden relative">
            <img 
              src={url} 
              alt={`Upload ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <button 
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {imagePreviewUrls.length < 6 && (
          <label 
            className="aspect-square rounded-xl border border-holiday-border flex flex-col items-center justify-center cursor-pointer hover:bg-holiday-gray"
          >
            <span className="text-2xl text-gray-300">+</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
              disabled={disabled}
              required={imagePreviewUrls.length === 0}
            />
            <span className="text-xs text-gray-400">Add Photo</span>
          </label>
        )}
        
        {Array.from({ length: Math.max(0, 5 - imagePreviewUrls.length) }).map((_, index) => (
          <div 
            key={`empty-${index}`} 
            className="aspect-square rounded-xl border border-dashed border-gray-200"
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">Click the + to add an image</p>
    </div>
  );
};

export default ImageUploader;
