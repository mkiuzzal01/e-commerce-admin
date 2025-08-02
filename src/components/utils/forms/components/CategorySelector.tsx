import { useEffect, useMemo, useRef } from "react";
import { Grid } from "@mui/material";
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

  // track first render to prevent clearing on load
  const isFirstRender = useRef(true);

  const selectedMainCategory = useMemo(() => {
    return mainCategoryData?.data?.result?.find(
      (mainCat: any) => mainCat._id === selectedMainCategoryId
    );
  }, [mainCategoryData, selectedMainCategoryId]);

  const categoryOptions = useMemo(() => {
    return (
      selectedMainCategory?.category?.map((c: any) => ({
        label: c.name,
        value: c._id,
      })) || []
    );
  }, [selectedMainCategory]);

  const subCategoryOptions = useMemo(() => {
    return (
      selectedMainCategory?.subCategory?.map((sc: any) => ({
        label: sc.name,
        value: sc._id,
      })) || []
    );
  }, [selectedMainCategory]);

  const previousMainCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    if (isFirstRender.current) {
      previousMainCategoryRef.current = selectedMainCategoryId;
      isFirstRender.current = false;
      return;
    }

    if (
      previousMainCategoryRef.current &&
      previousMainCategoryRef.current !== selectedMainCategoryId
    ) {
      setValue("category", "");
      setValue("subCategory", "");
    }

    previousMainCategoryRef.current = selectedMainCategoryId;
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
