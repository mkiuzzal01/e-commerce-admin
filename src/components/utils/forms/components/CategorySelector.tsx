import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import AutocompleteInput from "../../../utils/input-fields/AutocompleteInput";

export const CategorySelector = ({
  mainCategoryData,
}: {
  mainCategoryData: any;
}) => {
  const { control, setValue } = useFormContext();

  const selectedMainCategoryId = useWatch({
    control,
    name: "mainCategory",
  });

  const selectedMainCategory = mainCategoryData?.data?.result?.find(
    (mainCat: any) => mainCat._id === selectedMainCategoryId
  );

  const categoryOptions =
    selectedMainCategory?.category?.map((c: any) => ({
      label: c.name,
      value: c._id,
    })) || [];

  const subCategoryOptions =
    selectedMainCategory?.subCategory?.map((sc: any) => ({
      label: sc.name,
      value: sc._id,
    })) || [];

  useEffect(() => {
    setValue("category", "");
    setValue("subCategory", "");
  }, [selectedMainCategoryId, setValue]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <AutocompleteInput
          name="mainCategory"
          label="Main Category"
          multiple={false}
          required
          placeholder="Select main category"
          options={
            mainCategoryData?.data?.result?.map((item: any) => ({
              label: item.name,
              value: item._id,
            })) || []
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AutocompleteInput
          name="category"
          label="Category"
          multiple={false}
          required
          placeholder="Select category"
          options={categoryOptions}
          disabled={categoryOptions.length === 0}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AutocompleteInput
          name="subCategory"
          label="Sub Category"
          multiple={false}
          required
          placeholder="Select sub-category"
          options={subCategoryOptions}
          disabled={subCategoryOptions.length === 0}
        />
      </Grid>
    </Grid>
  );
};
