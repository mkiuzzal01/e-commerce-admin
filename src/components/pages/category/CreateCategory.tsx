/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import {
  useAllCategoryQuery,
  useAllMainCategoryQuery,
  useAllSubCategoryQuery,
  useCreateCategoryMutation,
  useCreateMainCategoryMutation,
  useCreateSubCategoryMutation,
} from "../../../redux/features/category/category-api";
import Loader from "../../../shared/Loader";
import ReusableModal from "../../../shared/ReusableModal";
import AutocompleteInput from "../../utils/input-fields/AutocompleteInput";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import type { FieldValue } from "react-hook-form";
import InputWithSuggestion from "../../utils/input-fields/InputWithSuggestion";

const CreateCategory = () => {
  const [isSubCate, setSubCate] = useState(false);
  const [isCate, setCate] = useState(false);
  const { showToast } = useToast();

  const {
    data: subCategoryData,
    isLoading: subLoading,
    refetch: refetchSub,
  } = useAllSubCategoryQuery({});
  const {
    data: mainCategoryData,
    isLoading: mainLoading,
    refetch: refetchMain,
  } = useAllMainCategoryQuery({});
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refetch: refetchCategory,
  } = useAllCategoryQuery({});

  const [createSubCategory, { isLoading: creatingSub }] =
    useCreateSubCategoryMutation();
  const [createCategory, { isLoading: creatingCategory }] =
    useCreateCategoryMutation();
  const [createMainCategory, { isLoading: creatingMain }] =
    useCreateMainCategoryMutation();

  const subCategoryOptions =
    subCategoryData?.data?.result?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const mainCategoryOptions =
    mainCategoryData?.data?.result?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const categoryOptions =
    categoryData?.result?.map((item: any) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const onSubmitMainCategory = async (data: FieldValue<any>) => {
    console.log(data);
    try {
      const payload = {
        name: data?.mainCategory?.value,
        category: data?.category,
        subCategory: data?.subCategory,
      };

      const res = await createMainCategory(payload).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Main Category created!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchMain();
        setCate(false);
      }
    } catch {
      showToast({
        message: "Failed to create main category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const onSubmitSubCategory = async (data: FieldValue<any>) => {
    try {
      const res = await createSubCategory({
        name: data?.subCategory?.value,
      }).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Sub Category created!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchSub();
        setSubCate(false);
      }
    } catch {
      showToast({
        message: "Failed to create sub category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  const onSubmitCategory = async (data: FieldValue<any>) => {
    try {
      const res = await createCategory({
        name: data?.category?.value,
      }).unwrap();
      if (res?.success) {
        showToast({
          message: res.message || "Category created successfully!",
          type: "success",
          duration: 3000,
          position: { horizontal: "center", vertical: "top" },
        });
        refetchCategory();
        setCate(false);
      }
    } catch {
      showToast({
        message: "Failed to create category.",
        type: "error",
        duration: 3000,
        position: { horizontal: "center", vertical: "top" },
      });
    }
  };

  if (subLoading || mainLoading || categoryLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create Product Category"
          subTitle="Provide your proper information"
        />

        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                justifyContent: "space-evenly",
                gap: 2,
                pt: 2,
              }}
            >
              <Button variant="contained" onClick={() => setCate(true)}>
                + Add Category
              </Button>
              <Button variant="contained" onClick={() => setSubCate(true)}>
                + Add Sub Category
              </Button>
            </Box>
          </Grid>

          <Grid
            size={{
              xs: 12,
            }}
          >
            <ReusableForm onSubmit={onSubmitMainCategory}>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <AutocompleteInput
                    multiple={true}
                    name="category"
                    label="Category"
                    options={categoryOptions}
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                  }}
                >
                  <AutocompleteInput
                    multiple={true}
                    name="subCategory"
                    label="Sub Category"
                    options={subCategoryOptions}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <InputWithSuggestion
                    name="mainCategory"
                    label="Main Category Name"
                    options={mainCategoryOptions}
                    required
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    size="large"
                    sx={{ py: 1.5 }}
                    disabled={creatingMain}
                  >
                    {creatingMain ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Create Main Category"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </ReusableForm>
          </Grid>
        </Grid>
      </Paper>

      {/* Sub Category Modal */}
      <ReusableModal open={isSubCate} onClose={() => setSubCate(false)}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{ p: 2 }}
        >
          <ReusableForm onSubmit={onSubmitSubCategory}>
            <>
              <InputWithSuggestion
                name="subCategory"
                label="Sub Category Name"
                options={subCategoryOptions}
                required
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ py: 1.5 }}
                  disabled={creatingSub}
                >
                  {creatingSub ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Sub Category"
                  )}
                </Button>
              </Box>
            </>
          </ReusableForm>
        </Grid>
      </ReusableModal>

      {/* Category Modal */}
      <ReusableModal open={isCate} onClose={() => setCate(false)}>
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
          sx={{ p: 2 }}
        >
          <ReusableForm onSubmit={onSubmitCategory}>
            <>
              <InputWithSuggestion
                name="category"
                label="Category Name"
                options={categoryOptions}
                required
              />
              <Box mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ py: 1.5 }}
                  disabled={creatingCategory}
                >
                  {creatingCategory ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Category"
                  )}
                </Button>
              </Box>
            </>
          </ReusableForm>
        </Grid>
      </ReusableModal>
    </Box>
  );
};

export default CreateCategory;
