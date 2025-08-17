import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Tooltip,
  useTheme,
  Button,
} from "@mui/material";
import { Delete, DriveFileRenameOutline } from "@mui/icons-material";
import type { TImage } from "../../gallery/TGallery";
import {
  useDeleteImageMutation,
  useUpdateImageMutation,
} from "../../../redux/features/gallery/image-api";
import { useToast } from "../tost-alert/ToastProvider";
import { useState } from "react";
import ReusableModal from "../../../shared/ReusableModal";
import ReusableForm from "../../../shared/ReusableFrom";
import TextInput from "../input-fields/TextInput";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setSelectedId } from "../../../redux/slices/selectedIdSlice";

type PropsType = {
  setSelectImage?: (image: TImage) => void;
  imagesData: TImage[];
  refetch?: () => void;
  selectionMode?: "single" | "multiple";
  selectedImages?: string[];
  onImageSelect?: (image: TImage) => void;
};

const AllImage = ({
  imagesData,
  refetch,
  selectionMode = "single",
  selectedImages = [],
  setSelectImage,
}: PropsType) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [renameOpen, setRename] = useState(false);
  const [selected, setSelected] = useState<TImage>();
  const [update, { isLoading: isUpdating }] = useUpdateImageMutation();
  const [deleteImage, { isLoading: isDeleting }] = useDeleteImageMutation();
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((state) => state.selectedId.selectedId);
  const { showToast } = useToast();

  // Handle pathname
  const path = pathname === "/images";

  // Handle update image name
  const handleEdit = async (value: { photoName: string }) => {
    try {
      const updateData = {
        _id: selected?._id as string,
        photoName: value.photoName,
      };
      const { data } = await update(updateData);
      if (data.success) {
        showToast({
          message: data.message || "Image renamed successfully!",
          type: "success",
          duration: 3000,
          position: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
      refetch?.();
      setRename(false);
    } catch {
      showToast({
        message: "Image rename failed!",
        type: "error",
        duration: 3000,
        position: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteImage(id);
      if (res.data.success) {
        showToast({
          message: res.data.message || "Image deleted successfully!",
          type: "success",
          duration: 3000,
          position: {
            vertical: "top",
            horizontal: "center",
          },
        });
        refetch?.();
      }
    } catch {
      showToast({
        message: "Image deletion failed!",
        type: "error",
        duration: 3000,
        position: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  // Handle image selection
  const handleSelect = (image: TImage) => {
    if (selectionMode === "single") {
      if (setSelectImage) {
        setSelectImage(image);
      } else {
        dispatch(setSelectedId(image._id));
      }
    }
  };

  return (
    <Box>
      <Grid container spacing={1} sx={{ pt: 2 }}>
        {imagesData.map((item) => (
          <Grid
            key={item?._id}
            size={{ xs: 4, md: 2 }}
            sx={{ cursor: "pointer" }}
          >
            <Paper
              onClick={() => handleSelect(item)}
              sx={{
                position: "relative",
                borderRadius: 2,
                height: 100,
                width: 100,
                overflow: "hidden",
                border:
                  (selectedId === item._id && !path) ||
                  selectedImages.includes(item._id)
                    ? "2px solid #0000FF"
                    : "2px solid transparent",
                transition: "0.3s",
                "&:hover .overlay": {
                  opacity: 0.5,
                },
                "&:hover .image-actions": {
                  opacity: 1,
                  visibility: "visible",
                },
              }}
            >
              {/* Image */}
              <Box>
                <img
                  src={item?.photo?.url || "/placeholder.png"}
                  alt={item?.photoName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {path && (
                <>
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "#000",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 1,
                    }}
                  />
                  <Box
                    className="image-actions"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      gap: 1,
                      opacity: 0,
                      visibility: "hidden",
                      zIndex: 2,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Tooltip title="Rename">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRename(true);
                          setSelected(item);
                        }}
                      >
                        <DriveFileRenameOutline
                          sx={{
                            fontSize: 22,
                            color: theme.palette.grey[100],
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                      >
                        {isDeleting ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Delete
                            sx={{
                              fontSize: 22,
                              color: theme.palette.error.light,
                            }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              )}

              {/* Image Name */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  px: 1,
                  py: 0.5,
                  zIndex: 2,
                }}
              >
                <Tooltip title={item?.photoName}>
                  <Typography
                    variant="caption"
                    color="white"
                    noWrap
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {item?.photoName}
                  </Typography>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <ReusableModal open={renameOpen} onClose={() => setRename(false)}>
        <Typography variant="h6" mb={2}>
          Rename image
        </Typography>
        <ReusableForm
          onSubmit={handleEdit}
          defaultValues={{ photoName: selected?.photoName || "" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput name="photoName" label="Photo Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button variant="contained" type="submit" fullWidth>
                {isUpdating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Rename"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </ReusableModal>
    </Box>
  );
};

export default AllImage;
