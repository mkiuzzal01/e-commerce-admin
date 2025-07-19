export interface ImageFile {
  file: File;
  id: string;
  preview: string;
}

export type ImageInputProps = {
  onChange: (files: ImageFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedFormats?: string[];
  multiple?: boolean;
};

export interface ImageInputRef {
  openFileDialog: () => void;
}
