/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import ReusableForm from "../../../shared/ReusableFrom";
import TextInput from "../input-fields/TextInput";
import Loader from "../../../shared/Loader";
import FormHeader from "../FormHeader";
import { useNavigate } from "react-router-dom";
import { useToast } from "../tost-alert/ToastProvider";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";
import { AddAPhoto } from "@mui/icons-material";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Images from "../../gallery/Images";
import { SaveIcon } from "lucide-react";
import {
  useCreateBannerContentMutation,
  useUpdateBannerContentMutation,
} from "../../../redux/features/banner-content/banner_content.api";

type Props = {
  initialData?: FieldValues;
};
export default function BannerContentForm({ initialData }: Props) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mainImageDrawerOpen, setMainImageDrawerOpen] = useState(false);
  const selectedId = useAppSelector(
    (state) => state.selectedId?.selectedId || initialData?.image?._id
  );
  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );

  const [createContent, { isLoading: isCreating }] =
    useCreateBannerContentMutation();
  const [updateContent, { isLoading: isUpdating }] =
    useUpdateBannerContentMutation();

  const onSubmit = async (data: FieldValues) => {
    if (!selectedId) {
      showToast({ message: "Please select an image first", type: "error" });
      return;
    }

    const payload = {
      ...data,
      image: selectedId,
    };

    try {
      if (initialData?._id) {
         await updateContent({ id: initialData._id, ...payload }).unwrap();
        showToast({ message: "Content updated successfully", type: "success" });
      } else {
        await createContent(payload).unwrap();
        showToast({ message: "Content created successfully", type: "success" });
      }
      navigate("/all-content");
    } catch (error: any) {
      showToast({
        message: error?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };
  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title={
            initialData ? "Update banner content" : "Create banner content"
          }
          subTitle="Provide your proper information"
        />
        <ReusableForm onSubmit={onSubmit} defaultValues={initialData}>
          <Grid container spacing={2} mt={4}>
            <Grid size={{ sm: 12, md: 6 }}>
              <Box>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2 }}
                >
                  {isImageLoading ? (
                    <Loader />
                  ) : selectedId ? (
                    <Box
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          image?.data?.photo?.url ||
                          initialData?.image?.photo?.url
                        }
                        alt={image?.data?.photoName || "Selected Image"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {image?.data?.photoName && (
                        <Box fontWeight={500} fontSize={14} mt={1}>
                          {image?.data?.photoName}
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        py: 4,
                        borderRadius: 1,
                        textAlign: "center",
                        color: "text.secondary",
                        border: "1px dashed #ccc",
                        fontSize: 14,
                      }}
                    >
                      No Image Selected
                    </Box>
                  )}
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => setMainImageDrawerOpen(true)}
                  startIcon={<AddAPhoto />}
                >
                  {selectedId ? "Change Image" : "Add Image"}
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextInput
                name="title"
                label="Title"
                placeholder="Write the banner title"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextInput
                name="subTitle"
                label="Sub Title"
                placeholder="Write the banner sub title"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextInput
                name="description"
                label="Description"
                placeholder="Write the banner description"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="buttonText"
                label="Button Text"
                placeholder="Write the banner button text"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="link"
                label="Link"
                placeholder="Write the banner link"
                required
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="medium"
                disabled={isCreating || isUpdating}
                startIcon={
                  isCreating || isUpdating ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
              >
                {initialData ? "Update" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
        {/* Image Drawer */}
        <ReusableDrawer
          width="50%"
          open={mainImageDrawerOpen}
          onClose={() => {
            setMainImageDrawerOpen(false);
            return true;
          }}
        >
          <Images selectionMode="single" />
        </ReusableDrawer>
      </Paper>
    </Box>
  );
}
