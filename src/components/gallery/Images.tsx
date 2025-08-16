/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Fab,
  useTheme,
  Grid,
  DialogTitle,
} from "@mui/material";
import { Search, AddPhotoAlternate } from "@mui/icons-material";
import AllImage from "../utils/gallery/AllImage";
import { useGetFoldersQuery } from "../../redux/features/gallery/folder-api";
import Loader from "../../shared/Loader";
import type { TFolder } from "./TGallery";
import { useGetImagesQuery } from "../../redux/features/gallery/image-api";
import ReusableDrawer from "../../shared/ReusableDrawer";
import AddMultipleImages from "../utils/gallery/AddImage";
import ReusablePagination from "../../shared/ReusablePagination";
import Empty from "../../shared/Empty";

interface ImagesProps {
  selectionMode?: "single" | "multiple";
  onSelectImage?: (image: any) => void;
  excludeIds?: string[];
}

export default function Images({
  selectionMode = "single",
  onSelectImage,
  excludeIds = [],
}: ImagesProps) {
  const theme = useTheme();
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { data: foldersData, isFetching } = useGetFoldersQuery({});
  const [folderId, setFolderId] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const queryParams: Record<string, any> = {
    page,
    limit: 24,
  };

  if (search.trim()) queryParams.searchTerm = search.trim();
  if (folderId) queryParams.folderId = folderId;

  const {
    data: imagesData,
    isLoading,
    refetch,
  } = useGetImagesQuery({
    queryParams,
  });

  const totalPages = imagesData?.data?.meta?.totalPages || 1;

  const handleImageSelect = (image: any) => {
    if (selectionMode === "single") {
      setSelectedImages([image._id]);
    } else {
      // Multiple selection mode
      setSelectedImages((prev) =>
        prev.includes(image._id)
          ? prev.filter((id) => id !== image._id)
          : [...prev, image._id]
      );
    }
  };

  // Filter out excluded images
  const filteredImages =
    imagesData?.data?.result?.filter(
      (img: any) => !excludeIds.includes(img._id)
    ) || [];

  if (isFetching || isLoading) return <Loader />;

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <Grid container spacing={2} alignItems="center">
        {/* folder select */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Select
            value={folderId}
            onChange={(e) => setFolderId(e?.target?.value)}
            fullWidth
            displayEmpty
            MenuProps={{
              PaperProps: { sx: { zIndex: theme.zIndex.modal + 1 } },
            }}
          >
            <MenuItem value="">
              <em>Select folder</em>
            </MenuItem>
            {foldersData?.data?.result?.map((folder: TFolder) => (
              <MenuItem key={folder?._id} value={folder?._id}>
                {folder?.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        {/* search */}
        <Grid size={{ xs: 10, md: 6 }}>
          <OutlinedInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Search images"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

        {/* add-image fab */}
        <Grid size={{ xs: 2, md: 2 }}>
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddPhotoAlternate />
          </Fab>
        </Grid>
      </Grid>

      {/* side drawer for uploading images */}
      <ReusableDrawer
        open={open}
        onClose={() => {
          setOpen(false);
          return true;
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <DialogTitle variant="h5">Upload Image</DialogTitle>
        </Box>

        <Box sx={{ mt: 3 }}>
          <AddMultipleImages
            onClose={() => {
              setOpen(false);
              return true;
            }}
            refetch={refetch}
          />
        </Box>
      </ReusableDrawer>

      <Box sx={{ my: 3, borderBottom: `1px solid ${theme.palette.divider}` }} />

      {/* load all images from database */}
      {filteredImages.length === 0 ? (
        <Empty heading="No images found" />
      ) : (
        <Box>
          <AllImage
            refetch={refetch}
            imagesData={filteredImages}
            selectionMode={selectionMode}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
            setSelectImage={
              selectionMode === "single" ? onSelectImage : undefined
            }
          />
          <Box>
            <ReusablePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </Box>
        </Box>
      )}
    </Paper>
  );
}
