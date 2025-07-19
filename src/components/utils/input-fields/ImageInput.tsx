import React, { useRef, forwardRef, useImperativeHandle } from "react";
import type { ImageFile, ImageInputProps, ImageInputRef } from "../TUtils";

const ImageInput = forwardRef<ImageInputRef, ImageInputProps>(({ 
  onChange, 
  maxFiles = 10,
  maxFileSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  multiple = true
}, ref) => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      inputRef.current?.click();
    }
  }));

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid file type. Accepted formats: ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}`;
    }
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    return null;
  };

  const processFiles = (fileList: FileList): Promise<ImageFile[]> => {
    return new Promise((resolve) => {
      const files = Array.from(fileList);
      const validFiles: ImageFile[] = [];
      let processedCount = 0;

      if (files.length === 0) {
        resolve([]);
        return;
      }

      files.forEach((file, index) => {
        const error = validateFile(file);
        
        if (error) {
          console.warn(`File ${file.name}: ${error}`);
          processedCount++;
          if (processedCount === files.length) {
            resolve(validFiles);
          }
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          validFiles.push({
            file,
            id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
            preview: reader.result as string
          });
          
          processedCount++;
          if (processedCount === files.length) {
            resolve(validFiles);
          }
        };
        reader.readAsDataURL(file);
      });
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = await processFiles(e.target.files);
      onChange(newFiles.slice(0, maxFiles)); 
      e.target.value = '';
    } else {
      onChange([]);
    }
  };

  return (
    <input
      ref={inputRef}
      type="file"
      hidden
      accept={acceptedFormats.join(',')}
      multiple={multiple}
      onChange={handleChange}
    />
  );
});

ImageInput.displayName = 'ImageInput';

export default ImageInput;