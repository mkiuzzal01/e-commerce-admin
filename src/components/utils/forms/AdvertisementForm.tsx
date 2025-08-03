import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import TextInput from "../../utils/input-fields/TextInput";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Images from "../../gallery/Images";
import Loader from "../../../shared/Loader";
import { useAppSelector } from "../../../redux/hooks";
import { useToast } from "../tost-alert/ToastProvider";

import {
  useCreateAdvertisementMutation,
  useUpdateAdvertisementMutation,
} from "../../../redux/features/advertisement/advertisement.api";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";

import type { FieldValues } from "react-hook-form";
import RadioInput from "../input-fields/RadioInput";
import { SaveIcon } from "lucide-react";

type Props = {
  initialData?: FieldValues;
};

const AdvertisementForm = ({ initialData }: Props) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [mainImageDrawerOpen, setMainImageDrawerOpen] = useState(false);

  const selectedId = useAppSelector(
    (state) => state.selectedId?.selectedId || initialData?.image?._id
  );

  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );

  const [createAds, { isLoading: isCreating }] =
    useCreateAdvertisementMutation();
  const [updateAds, { isLoading: isUpdating }] =
    useUpdateAdvertisementMutation();

  const onSubmit = async (values: FieldValues) => {
    if (!selectedId) {
      return showToast({
        message: "Please select an image",
        type: "error",
      });
    }

    const formData = {
      ...values,
      image: selectedId,
    };

    try {
      if (initialData) {
        const res = await updateAds({
          id: initialData._id,
          ...formData,
        }).unwrap();

        if (res?.success) {
          showToast({ message: "Advertisement updated", type: "success" });
        }
      } else {
        const res = await createAds(formData).unwrap();
        if (res?.success) {
          showToast({ message: "Advertisement created", type: "success" });
        }
      }

      navigate("/all-advertisement");
    } catch (err: any) {
      showToast({
        message: err?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title={initialData ? "Update advertisement" : "Create advertisement"}
          subTitle="Provide your proper information"
        />

        <ReusableForm onSubmit={onSubmit} defaultValues={initialData}>
          <Grid container spacing={3} mt={4}>
            {/* Image Preview and Upload Button */}
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
                          initialData?.productImage?.photo?.url
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

            <Grid size={{ sm: 12, md: 6 }}>
              <RadioInput
                name={"isActive"}
                label={"Do you active?"}
                options={[
                  {
                    value: true,
                    label: "Yes",
                  },
                  {
                    value: false,
                    label: "No",
                  },
                ]}
              />
            </Grid>

            <Grid size={{ sm: 12 }}>
              <TextInput name="title" label="Title" required />
            </Grid>
            {/* Text Fields */}
            <Grid size={{ sm: 12 }}>
              <TextInput name="subTitle" label="Sub Title" required />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ sm: 12, md: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isCreating || isUpdating}
                sx={{ py: 1.5 }}
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
      </Paper>

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
    </Box>
  );
};

export default AdvertisementForm;
