import React from "react";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import TextInput from "./input-fields/TextInput";
import AutocompleteInput from "./input-fields/AutocompleteInput";
import { nanoid } from "nanoid";

interface Attribute {
  id: string;
  value: string;
  quantity: number;
}

interface Variant {
  id: string;
  name: string;
  attributes: Attribute[];
}

interface Option {
  label: string;
  value: string;
}

interface VariantsSectionProps {
  variantNameOptions?: Option[];
  attributeOptions?: Record<string, Option[]>;
}

const VariantsSection: React.FC<VariantsSectionProps> = ({
  variantNameOptions = [],
  attributeOptions = {},
}) => {
  const { control, setValue, getValues } = useFormContext();

  // Get current variants from form
  const variants: Variant[] = useWatch({
    control,
    name: "variants",
    defaultValue: [
      {
        id: nanoid(),
        name: "",
        attributes: [{ id: nanoid(), value: "", quantity: 0 }],
      },
    ],
  });

  // Create empty variant
  const createEmptyVariant = (): Variant => ({
    id: nanoid(),
    name: "",
    attributes: [{ id: nanoid(), value: "", quantity: 0 }],
  });

  // Create empty attribute
  const createEmptyAttribute = (): Attribute => ({
    id: nanoid(),
    value: "",
    quantity: 0,
  });

  // Add variant
  const addVariant = () => {
    const currentVariants = getValues("variants") || [];
    setValue("variants", [...currentVariants, createEmptyVariant()]);
  };

  // Remove variant
  const removeVariant = (variantId: string) => {
    const currentVariants = getValues("variants") || [];
    const filtered = currentVariants.filter((v: Variant) => v.id !== variantId);
    setValue(
      "variants",
      filtered.length > 0 ? filtered : [createEmptyVariant()]
    );
  };

  // Add attribute
  const addAttribute = (variantId: string) => {
    const currentVariants = getValues("variants") || [];
    setValue(
      "variants",
      currentVariants.map((variant: Variant) =>
        variant.id === variantId
          ? {
              ...variant,
              attributes: [...variant.attributes, createEmptyAttribute()],
            }
          : variant
      )
    );
  };

  // Remove attribute
  const removeAttribute = (variantId: string, attributeId: string) => {
    const currentVariants = getValues("variants") || [];
    setValue(
      "variants",
      currentVariants.map((variant: Variant) =>
        variant.id === variantId && variant.attributes.length > 1
          ? {
              ...variant,
              attributes: variant.attributes.filter(
                (attr) => attr.id !== attributeId
              ),
            }
          : variant
      )
    );
  };

  // Get attribute options for current variant name
  const getAttributeOptions = (variantIndex: number): Option[] => {
    const variantName = variants[variantIndex]?.name?.toLowerCase?.() || "";
    return Array.isArray(attributeOptions[variantName])
      ? attributeOptions[variantName]
      : [];
  };

  return (
    <Box sx={{ mb: 4 }}>
      {variants.map((variant, variantIndex) => {
        const dynamicAttributeOptions = getAttributeOptions(variantIndex);
        const canRemoveVariant = variants.length > 1;
        const canRemoveAttribute = variant.attributes.length > 1;

        return (
          <Card
            key={variant.id}
            sx={{
              mb: 3,
              borderColor: "divider",
              "&:hover": { borderColor: "primary.main" },
            }}
          >
            <CardContent>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={`Variant ${variantIndex + 1}`}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                  {variant.name && (
                    <Typography variant="body2" color="text.secondary">
                      {variant.name}
                    </Typography>
                  )}
                </Stack>

                <Stack direction="row" spacing={1}>
                  {canRemoveVariant && (
                    <IconButton
                      color="error"
                      onClick={() => removeVariant(variant.id)}
                      size="small"
                      aria-label={`Remove variant ${variantIndex + 1}`}
                    >
                      <Delete />
                    </IconButton>
                  )}

                  <Button
                    startIcon={<Add />}
                    onClick={addVariant}
                    variant="outlined"
                    size="small"
                    color="primary"
                  >
                    Add Variant
                  </Button>
                </Stack>
              </Box>

              <Grid container spacing={3}>
                {/* Variant Name */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <AutocompleteInput
                    name={`variants[${variantIndex}].name`}
                    label="Variant Type"
                    placeholder="e.g., Color, Size"
                    required
                    options={variantNameOptions}
                  />
                </Grid>

                {/* Attributes */}
                <Grid size={{ xs: 12, md: 8 }}>
                  <Box>
                    {variant.attributes.map((attribute, attributeIndex) => (
                      <Grid
                        container
                        spacing={2}
                        key={attribute.id}
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Grid size={{ xs: 12, md: 5 }}>
                          <AutocompleteInput
                            name={`variants[${variantIndex}].attributes[${attributeIndex}].value`}
                            label="Option Value"
                            placeholder="e.g., Red, Large"
                            required
                            options={dynamicAttributeOptions}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                          <TextInput
                            name={`variants[${variantIndex}].attributes[${attributeIndex}].quantity`}
                            label="Stock Quantity"
                            type="number"
                            placeholder="0"
                            required
                          />
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                          {canRemoveAttribute && (
                            <IconButton
                              color="error"
                              onClick={() =>
                                removeAttribute(variant.id, attribute.id)
                              }
                              size="small"
                              aria-label={`Remove option ${attributeIndex + 1}`}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}

                    <Button
                      startIcon={<Add />}
                      onClick={() => addAttribute(variant.id)}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Add Option
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default VariantsSection;
