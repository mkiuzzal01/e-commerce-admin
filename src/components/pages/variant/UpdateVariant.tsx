/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSingleVariantQuery,
  useUpdateVariantMutation,
} from "../../../redux/features/variant/variant-api";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { nanoid } from "nanoid";
import type { FieldValue } from "react-hook-form";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import InputWithSuggestion from "../../utils/input-fields/InputWithSuggestion";

type AttributeInput = {
  id: string;
  value: string;
};

export default function UpdateVariant() {
  const { slug } = useParams();
  const { data, isLoading } = useSingleVariantQuery(slug ?? "");
  const [updateVariant, { isLoading: isUpdating }] = useUpdateVariantMutation();
  const { showToast } = useToast();

  const variant = data?.data;
  const [attributes, setAttributes] = useState<AttributeInput[]>([]);

  useEffect(() => {
    if (variant?.attributes?.length) {
      const initialAttributes = variant.attributes.map((attr: any) => ({
        id: nanoid(),
        value: attr?.value || "",
      }));
      setAttributes(initialAttributes);
    }
  }, [variant]);

  const attributeValueOptions = useMemo(() => {
    const values = variant?.attributes?.map((attr: any) => attr?.value) || [];
    return [...new Set(values)]
      .filter((val): val is string => typeof val === "string")
      .map((val) => ({ label: val, value: val }));
  }, [variant]);

  const defaultValues = useMemo(() => {
    const attrDefaults: Record<string, any> = {};
    attributes.forEach((attr) => {
      attrDefaults[`attr_${attr.id}`] = {
        label: attr.value,
        value: attr.value,
      };
    });

    return {
      name: variant?.name
        ? { label: variant.name, value: variant.name }
        : undefined,
      ...attrDefaults,
    };
  }, [attributes, variant?.name]);

  const handleAddAttribute = () =>
    setAttributes((prev) => [...prev, { id: nanoid(), value: "" }]);

  const handleRemoveAttribute = (id: string) =>
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));

  // Submit Handler
  const onSubmit = async (formData: FieldValue<any>) => {
    try {
      const attributeValues = attributes.map((attr) => {
        const input = formData[`attr_${attr.id}`];
        return {
          value:
            typeof input === "object" && input?.value ? input.value : input,
        };
      });

      const nameInput = formData.name;
      const name =
        typeof nameInput === "object" && nameInput?.value
          ? nameInput.value
          : nameInput;

      const payload = { name, attributes: attributeValues };
      const res = await updateVariant({ slug, body: payload }).unwrap();
      if (res?.success) {
        showToast({
          message: res?.message || "Variant updated successfully!",
          type: "success",
          position: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
    } catch (error: any) {
      const errMsg =
        error?.data?.message || error?.message || "Update failed. Try again.";
      showToast({
        message: errMsg,
        type: "error",
        position: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title="Update Variant"
          subTitle="Modify the variant name and its attributes."
        />

        <ReusableForm
          key={attributes.length}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <Grid container spacing={3}>
            {/* Variant Name */}
            <Grid size={{ xs: 12 }} mt={2}>
              <InputWithSuggestion
                name="name"
                label="Variant Name"
                placeholder="e.g. Color, Size"
                options={
                  variant?.name
                    ? [{ label: variant.name, value: variant.name }]
                    : []
                }
                required
              />
            </Grid>

            {/* Attribute Fields */}
            <Grid size={{ xs: 12 }}>
              {attributes.map((attr) => (
                <Grid
                  key={attr.id}
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid size={{ xs: 10 }}>
                    <InputWithSuggestion
                      name={`attr_${attr.id}`}
                      label="Attribute Value"
                      placeholder="e.g. Red, Large, Cotton"
                      options={attributeValueOptions}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    {attributes.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveAttribute(attr.id)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}

              <Button
                onClick={handleAddAttribute}
                variant="outlined"
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Add Attribute
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" disabled={isUpdating}>
                {isUpdating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Update Variant"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
