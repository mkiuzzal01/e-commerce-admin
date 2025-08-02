import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import type { FieldValue } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../redux/features/category/category-api";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import TextInput from "../../utils/input-fields/TextInput";

export default function UpdateCategory() {
  const { slug } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { data, isLoading } = useSingleCategoryQuery(slug ?? "");
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const handleSubmit = async (formData: FieldValue<any>) => {
    try {
      await updateCategory({
        slug: data?.data?.slug,
        name: formData?.name,
      }).unwrap();
      showToast({
        message: "Category updated successfully!",
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
        message: "Failed to update category.",
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
          title="Update Category"
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
              <TextInput name="name" label="Category Name" />
            </Grid>
            <Grid size={{ xs: 12 }}>
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
