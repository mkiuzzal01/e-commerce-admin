import { Box, Button, Grid, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import TextInput from "../../utils/input-fields/TextInput";
import SectionHeader from "../../utils/section/SectionHeader";
import { BiSolidCategory } from "react-icons/bi";

type SubCategoryProps = {
  name: string;
};
type CategoryProps = {
  name: string;
  mainCategoryId?: string;
  subCategoryId?: string;
};
type MainCategoryProps = {
  name: string;
};
const CreateCategory = () => {
  const handleSubCategory = (data: SubCategoryProps) => {
    console.log(data);
  };
  const handleMainCategory = (data: CategoryProps) => {
    console.log(data);
  };
  const handleCategory = (data: MainCategoryProps) => {
    console.log(data);
  };
  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create product category"
          subTitle="Provide your proper information"
        />
        <Grid container spacing={3}>
          {/* subCategory */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionHeader
              icon={<BiSolidCategory />}
              title="Create Sub Category"
              subtitle="Add a new sub category to organize your items better."
            />
            <ReusableForm onSubmit={handleSubCategory}>
              <TextInput name="name" label="Main Category Name" required />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                  sx={{ py: 1.5 }}
                >
                  Create
                </Button>
              </Box>
            </ReusableForm>
          </Grid>

          {/* mainCategory */}
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionHeader
              icon={<BiSolidCategory />}
              title="Create Main Category"
              subtitle="Define a top-level category for better data structure."
            />
            <ReusableForm onSubmit={handleMainCategory}>
              <TextInput name="name" label="Sub Category Name" required />

              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="small"
                  sx={{ py: 1.5 }}
                >
                  Create
                </Button>
              </Box>
            </ReusableForm>
          </Grid>

          {/* Category */}
          <Grid size={{ xl: 12 }}>
            <SectionHeader
              icon={<BiSolidCategory />}
              title="Create Category"
              subtitle="Link your main and sub categories into one."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <ReusableForm onSubmit={handleCategory}>
              <Box>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextInput
                      name="nameCategory"
                      label="Category Name"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInputField
                      name="mainCategory"
                      label="Main Category"
                      options={["Product", "Courses", "Sell", "Profit"]}
                      requiredMessage="Select Main Category"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInputField
                      name="subCategory"
                      label="Sub Category"
                      options={["Product", "Courses", "Sell", "Profit"]}
                      requiredMessage="Select Sub Category"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                      size="large"
                      sx={{ py: 1.5 }}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </ReusableForm>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CreateCategory;
