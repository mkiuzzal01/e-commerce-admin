import React, { useState, useRef } from "react";
import {
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Chip,
  CircularProgress,
  Fade,
  Zoom,
} from "@mui/material";
import {
  Upload,
  Delete,
  CloudUpload,
  Close,
  PhotoLibrary,
} from "@mui/icons-material";
import ReusableForm from "../../../shared/ReusableFrom";
import Loader from "../../../shared/Loader";
import { useGetFoldersQuery } from "../../../redux/features/gallery/folder-api";
import SelectInputField from "../input-fields/SelectInputField";
import ImageInput from "../input-fields/ImageInput";
import { useUploadImageMutation } from "../../../redux/features/gallery/image-api";
import type { ImageFile, ImageInputRef } from "../TUtils";
import { useToast } from "../tost-alert/ToastProvider";

type Props = {
  onClose: () => boolean;
  refetch?: () => void;
};

const AddMultipleImages = ({ onClose, refetch }: Props) => {
  const { data: foldersData, isFetching: isFetchingFolders } =
    useGetFoldersQuery({});
  const [uploadImages, { isLoading: isUploading }] = useUploadImageMutation();
  const { showToast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const inputRef = useRef<ImageInputRef | null>(null);

  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 10; // MB

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setDragActive(false);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const files = Array.from(fileList);
    const newErrors: string[] = [];

    if (selectedFiles.length + files.length > MAX_FILES) {
      newErrors.push(
        `Maximum ${MAX_FILES} files allowed. You can select ${MAX_FILES - selectedFiles.length} more files.`
      );
    }

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const nonImageFiles = files.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFiles.length > 0) {
      newErrors.push(`${nonImageFiles.length} non-image files were ignored.`);
    }

    const processedFiles: ImageFile[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];

      if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
        newErrors.push(`${file.name} exceeds ${MAX_FILE_SIZE}MB size limit`);
        continue;
      }

      const isDuplicate = selectedFiles.some(
        (existing) =>
          existing.file.name === file.name && existing.file.size === file.size
      );

      if (isDuplicate) {
        newErrors.push(`${file.name} is already selected`);
        continue;
      }

      try {
        const preview = await createPreview(file);
        processedFiles.push({
          file,
          id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
          preview,
        });
      } catch {
        newErrors.push(`Failed to process ${file.name}`);
      }
    }

    if (processedFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...processedFiles]);
    }

    // Optional: show newErrors using toast/snackbar
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (files: ImageFile[]) => {
    const newFiles = files.filter(
      (newFile) =>
        !selectedFiles.some(
          (existing) =>
            existing.file.name === newFile.file.name &&
            existing.file.size === newFile.file.size
        )
    );

    if (newFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const clearAll = () => {
    setSelectedFiles([]);
  };

  const openFileDialog = () => {
    inputRef.current?.openFileDialog();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (formData: any) => {
    try {
      const uploadData = new FormData();

      const data = {
        folderId: formData.folderId,
        photoName: selectedFiles.map((file) => file.file.name),
      };

      uploadData.append("data", JSON.stringify(data));

      selectedFiles.forEach((imageFile) => {
        uploadData.append("files", imageFile.file);
      });

      const res = await uploadImages(uploadData).unwrap();

      if (res.success) {
        showToast({
          message: res.data.message || "Images uploaded successfully!",
          type: "success",
          duration: 3000,
          position: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }

      clearAll();
      refetch?.();
      onClose();
    } catch {
      showToast({
        message: "Images upload failed!",
        type: "error",
        duration: 3000,
        position: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  //the loader component:
  if (isFetchingFolders) return <Loader />;

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Select up to {MAX_FILES} images to upload to your gallery folder.
      </Typography>

      <ReusableForm onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SelectInputField
            label="Select Folder"
            name="folderId"
            requiredMessage="Folder is required"
            options={foldersData?.data?.result || []}
          />

          {/* Drag and Drop Area */}
          <Box
            sx={{
              border: "3px dashed",
              borderColor: dragActive ? "primary.main" : "grey.300",
              borderRadius: 3,
              p: 1,
              textAlign: "center",
              bgcolor: dragActive ? "primary.light" : "grey.50",
              transition: "all 0.3s ease",
              cursor: "pointer",
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "primary.light",
              },
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <ImageInput
              ref={inputRef}
              onChange={handleFileSelect}
              maxFiles={MAX_FILES}
              maxFileSize={MAX_FILE_SIZE}
            />

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              {dragActive ? (
                <Zoom in={dragActive}>
                  <Typography color="primary.main">
                    Drop your images here!
                  </Typography>
                </Zoom>
              ) : (
                <>
                  <IconButton
                    sx={{ bgcolor: "primary.main", color: "white", p: 3 }}
                  >
                    <CloudUpload fontSize="large" />
                  </IconButton>
                  <Typography variant="h5" fontWeight={600}>
                    Drag & drop your images here
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    or click to browse files
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<PhotoLibrary />}
                    size="large"
                  >
                    Choose Images
                  </Button>
                  <Typography variant="caption" color="text.secondary">
                    Supports: JPG, PNG, GIF, WebP • Max {MAX_FILE_SIZE}MB each •
                    Up to {MAX_FILES} files
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <Fade in={true}>
            <Box sx={{ mt: 4 }}>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                  Selected Images ({selectedFiles.length}/{MAX_FILES})
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              </Box>

              <Grid container spacing={3}>
                {selectedFiles.map((imageFile, index) => (
                  <Grid
                    key={imageFile.id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                  >
                    <Zoom
                      in={true}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          image={imageFile.preview}
                          alt={imageFile.file.name}
                          sx={{ objectFit: "cover" }}
                        />
                        <CardActions
                          sx={{ p: 2, justifyContent: "space-between" }}
                        >
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              noWrap
                              title={imageFile.file.name}
                              sx={{ fontWeight: 500, mb: 0.5 }}
                            >
                              {imageFile.file.name}
                            </Typography>
                            <Chip
                              label={formatFileSize(imageFile.file.size)}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          </Box>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeFile(imageFile.id)}
                            disabled={isUploading}
                          >
                            <Close />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Submit Button */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={selectedFiles.length === 0 || isUploading}
            startIcon={
              isUploading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                <Upload />
              )
            }
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 400,
              fontSize: "1.1rem",
            }}
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </Button>
        </Box>
      </ReusableForm>
    </Box>
  );
};

export default AddMultipleImages;
