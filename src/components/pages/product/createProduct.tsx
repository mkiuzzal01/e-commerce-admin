import React, { useState } from "react";
import { Box, Button, Grid, Paper, Chip } from "@mui/material";
import {
  Category as CategoryIcon,
  InfoOutlined as InfoOutlinedIcon,
  Inventory as InventoryIcon,
  AttachMoney as AttachMoneyIcon,
  Style as StyleIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { FaProductHunt } from "react-icons/fa6";
import { useAppSelector } from "../../../redux/hooks";
import type { FieldValues } from "react-hook-form";
import TextInput from "../../utils/input-fields/TextInput";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import SectionHeader from "../../utils/section/SectionHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import VariantsSection from "../../utils/VariantsSection";
import FormHeader from "../../utils/FormHeader";
import Images from "../../gallery/Images";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Loader from "../../../shared/Loader";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";
import { useAllVariantQuery } from "../../../redux/features/variant/variant-api";

// Types
interface Attribute {
  value: string;
  quantity: number;
}

interface Variant {
  name: string;
  attributes: Attribute[];
}

interface SelectedImage {
  _id: string;
  photo: {
    url: string;
  };
  photoName: string;
}

interface ProductFormValues {
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
}

const CreateProduct: React.FC = () => {
  const [mainImageDrawerOpen, setMainImageDrawerOpen] = useState(false);
  const [optionalImagesDrawerOpen, setOptionalImagesDrawerOpen] =
    useState(false);
  const [optionalImages, setOptionalImages] = useState<SelectedImage[]>([]);
  const { data: variantData } = useAllVariantQuery(undefined);
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", attributes: [{ value: "", quantity: 0 }] },
  ]);

  // Redux selectors and queries
  const selectedId = useAppSelector((state) => state?.selectedId?.selectedId);
  const { data: image, isLoading: isImageLoading } = useGetImageByIdQuery(
    selectedId || null
  );

  // Default form values
  const defaultValues: ProductFormValues = {
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

  // Status and activity options
  const statusOptions = ["in-stock", "out-stock", "low-stock", "pre-order"];
  const activityOptions = [
    "market-launch",
    "not-now",
    "coming-soon",
    "discontinued",
  ];

  // Form submission handler
  const onSubmit = (data: FieldValues) => {
    try {
      const parsedVariants = JSON.parse(data.variantsData || "[]");
      const formData = {
        ...data,
        variants: parsedVariants,
        mainImage: selectedId,
        optionalImages: optionalImages.map((img) => img._id),
      };

      console.log("Form Data:", formData);
      // Here you would typically dispatch an action to save the product
    } catch (error) {
      console.error("Error processing form data:", error);
    }
  };

  // Handle adding optional images
  const handleAddOptionalImage = (newImage: SelectedImage) => {
    if (!optionalImages.some((img) => img._id === newImage._id)) {
      setOptionalImages([...optionalImages, newImage]);
    }
  };

  // Handle removing optional images
  const handleRemoveOptionalImage = (id: string) => {
    setOptionalImages(optionalImages.filter((img) => img._id !== id));
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
            {/* Product Image Section */}
            <SectionHeader
              icon={<FaProductHunt />}
              title="Product Images"
              subtitle="Upload or select product images"
            />

            <Grid container spacing={4} alignItems="center">
              {/* Main Image Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    {isImageLoading ? (
                      <Loader />
                    ) : selectedId && image?.data?.photo?.url ? (
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
                          src={image?.data?.photo?.url}
                          alt={image?.data?.photoName || "Selected Image"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        {image?.data?.photoName && (
                          <Box fontWeight={500} fontSize={14} mb={0.5}>
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
                    startIcon={<AddIcon />}
                  >
                    {selectedId ? "Change Main Image" : "Add Main Image"}
                  </Button>
                </Box>
              </Grid>

              {/* Optional Images Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    {optionalImages.length > 0 ? (
                      optionalImages.map((img) => (
                        <Box
                          key={img?._id}
                          sx={{
                            position: "relative",
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={img?.photo.url}
                            alt={img?.photoName || "Optional Image"}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Chip
                            label="Remove"
                            color="error"
                            size="small"
                            onClick={() => handleRemoveOptionalImage(img?._id)}
                            sx={{
                              position: "absolute",
                              bottom: 4,
                              left: "50%",
                              transform: "translateX(-50%)",
                              fontSize: 11,
                            }}
                          />
                        </Box>
                      ))
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
                        No Optional Images Added
                      </Box>
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => setOptionalImagesDrawerOpen(true)}
                    startIcon={<AddIcon />}
                  >
                    Add Optional Images
                  </Button>
                </Box>
              </Grid>
            </Grid>

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
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  name="price"
                  label="Base Price"
                  type="number"
                  required
                  placeholder="0.00"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  name="discount"
                  label="Discount"
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
                  placeholder="e.g. Smartphones"
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
                  options={statusOptions}
                  requiredMessage="Status is required"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <SelectInputField
                  name="activity"
                  label="Market Activity"
                  options={activityOptions}
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
              <Grid size={{ xs: 12 }}>
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
              <Grid size={{ xs: 12 }}>
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

      {/* Main Image Selection Drawer */}
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

      {/* Optional Images Selection Drawer */}
      <ReusableDrawer
        width="50%"
        open={optionalImagesDrawerOpen}
        onClose={() => {
          setOptionalImagesDrawerOpen(false);
          return true;
        }}
      >
        <Images
          onSelectImage={handleAddOptionalImage}
          excludeIds={[
            ...optionalImages.map((img) => img._id),
            selectedId || "",
          ]}
        />
      </ReusableDrawer>
    </Box>
  );
};

export default CreateProduct;
