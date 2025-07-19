import { Box, Button, Grid, Paper } from "@mui/material";
import TextInput from "../../utils/input-fields/TextInput";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import { useState } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StyleIcon from "@mui/icons-material/Style";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import SectionHeader from "../../utils/section/SectionHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import VariantsSection from "../../utils/VariantsSection";
import FormHeader from "../../utils/FormHeader";
import { useAllVariantQuery } from "../../../redux/features/variant/variant-api";

type Attribute = {
  value: string;
  quantity: number;
};

type Variant = {
  name: string;
  attributes: Attribute[];
};

type CreateProductFormData = {
  productCode: string;
  title: string;
  subTitle: string;
  totalQuantity: number;
  price: number;
  discount: number;
  parentageForSeller: number;
  mainCategory: string;
  category: string;
  subCategory: string;
  description: string;
  status: string;
  activity: string;
  variantsData: string;
};

const CreateProduct = () => {
  const { data, isLoading, isError } = useAllVariantQuery(undefined);
  console.log(data);
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", attributes: [{ value: "", quantity: 0 }] },
  ]);

  const onSubmit = (data: CreateProductFormData) => {
    try {
      const parsedVariants = JSON.parse(data.variantsData || "[]");
      const formData = {
        ...data,
        variants: parsedVariants,
      };

      console.log("Form Data:", formData);
    } catch (error) {
      console.error("Error processing form data:", error);
    }
  };

  const defaultValues = {
    productCode: "",
    title: "",
    subTitle: "",
    totalQuantity: 0,
    price: 0,
    discount: 0,
    parentageForSeller: 0,
    mainCategory: "",
    category: "",
    subCategory: "",
    description: "",
    status: "",
    activity: "",
    variantsData: JSON.stringify(variants),
  };

  return (
    <Box>
      <Paper className="rounded-lg p-4 overflow-hidden">
        <FormHeader
          title="Create New Product"
          subTitle="Complete all required fields to create a new product listing"
        />

        <ReusableForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <Box>
            {/* Basic Information Section */}
            <SectionHeader
              icon={<InfoOutlinedIcon />}
              title="Basic Information"
              subtitle="Primary product details"
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="productCode"
                  label="Product Code"
                  required
                  placeholder="Enter unique product code"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextInput
                  name="title"
                  label="Product Title"
                  required
                  placeholder="Enter descriptive product title"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextInput
                  name="subTitle"
                  label="Product Subtitle"
                  required
                  placeholder="Enter additional product information"
                />
              </Grid>
            </Grid>

            {/* Pricing & Inventory Section */}
            <SectionHeader
              icon={<AttachMoneyIcon />}
              title="Pricing & Inventory"
              subtitle="Manage product stock and pricing"
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="price"
                  label="Base Price"
                  type="number"
                  required
                  placeholder="0.00"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="discount"
                  label="Discount"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="totalQuantity"
                  label="Total Quantity"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <TextInput
                  name="parentageForSeller"
                  label="Seller Percentage"
                  type="number"
                  required
                  placeholder="0"
                />
              </Grid>
            </Grid>

            {/* Category Section */}
            <SectionHeader
              icon={<CategoryIcon />}
              title="Category Information"
              subtitle="Specify product categories for better organization"
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="mainCategory"
                  label="Main Category"
                  required
                  placeholder="e.g. Electronics"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="category"
                  label="Category"
                  required
                  placeholder="e.g. xsartphones"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextInput
                  name="subCategory"
                  label="Sub Category"
                  required
                  placeholder="e.g. Android Phones"
                />
              </Grid>
            </Grid>

            {/* Status & Activity Section */}
            <SectionHeader
              icon={<InventoryIcon />}
              title="Status & Activity"
              subtitle="Set product visibility and availability"
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="status"
                  label="Inventory Status"
                  options={["in-stock", "out-stock", "low-stock", "pre-order"]}
                  requiredMessage="Status is required"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="activity"
                  label="Market Activity"
                  options={[
                    "market-launch",
                    "not-now",
                    "coming-soon",
                    "discontinued",
                  ]}
                  requiredMessage="Activity is required"
                />
              </Grid>
            </Grid>

            {/* Description Section */}
            <SectionHeader
              icon={<DescriptionIcon />}
              title="Product Description"
              subtitle="Provide detailed information about your product"
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 12 }}>
                <TextInput
                  name="description"
                  label="Full Description"
                  multiline={true}
                  row={6}
                  required
                  placeholder="Enter comprehensive product details, features, and specifications..."
                />
              </Grid>
            </Grid>

            {/* Variants Section */}
            <SectionHeader
              icon={<StyleIcon />}
              title="Product Variants"
              subtitle="Add different versions of your product"
            />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 12 }}>
                <VariantsSection
                  variants={variants}
                  setVariants={setVariants}
                />
              </Grid>
            </Grid>

            <Box className="flex mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Create Product
              </Button>
            </Box>
          </Box>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateProduct;
