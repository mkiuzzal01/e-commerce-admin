import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../../redux/features/category/category-api";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import FormHeader from "../../utils/FormHeader";
import TextInput from "../../utils/input-fields/TextInput";

type TUpdateSubCategory = {
  name: string;
};

export default function UpdateSubCategory() {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading } = useSingleSubCategoryQuery(slug ?? "");
  const [updateSubCategory, { isLoading: updating }] =
    useUpdateSubCategoryMutation();

  const handleSubmit = async (formData: TUpdateSubCategory) => {
    try {
      await updateSubCategory({
        slug: data?.data?.slug,
        name: formData?.name,
      }).unwrap();
      showToast({
        message: "Sub-category updated successfully!",
        type: "success",
        duration: 3000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
      });
      navigate(-1);
    } catch {
      showToast({
        message: "Failed to update sub-category.",
        type: "error",
      });
    }
  };

  //handle loading:
  if (isLoading) return <Loader />;

  return (
    <Box mt={2}>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Update Sub Category Category"
          subTitle="Provide your proper information"
        />

        <ReusableForm
          onSubmit={handleSubmit}
          defaultValues={{
            name: data?.data?.name || "",
          }}
        >
          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput name="name" label="Sub Category Name" />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                {updating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Update"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
