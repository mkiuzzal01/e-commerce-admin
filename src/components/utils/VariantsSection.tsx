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
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "./input-fields/TextInput";

type Attribute = {
  value: string;
  quantity: number;
};

type Variant = {
  name: string;
  attributes: Attribute[];
};

type VariantsSectionProps = {
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
};

const VariantsSection = ({ variants, setVariants }: VariantsSectionProps) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("variantsData", JSON.stringify(variants));
  }, [variants, setValue]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { name: "", attributes: [{ value: "", quantity: 0 }] },
    ]);
  };

  const removeVariant = (variantIndex: number) => {
    const newVariants = variants.filter((_, index) => index !== variantIndex);
    setVariants(
      newVariants.length
        ? newVariants
        : [{ name: "", attributes: [{ value: "", quantity: 0 }] }]
    );
  };

  const addAttribute = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].attributes.push({ value: "", quantity: 0 });
    setVariants(newVariants);
  };

  const removeAttribute = (variantIndex: number, attributeIndex: number) => {
    const newVariants = [...variants];
    if (newVariants[variantIndex].attributes.length > 1) {
      newVariants[variantIndex].attributes = newVariants[
        variantIndex
      ].attributes.filter((_, index) => index !== attributeIndex);
      setVariants(newVariants);
    }
  };

  return (
    <Box className="mb-8">
      {variants.map((variant, variantIndex) => (
        <Card
          key={`variant-${variantIndex}`}
          variant="outlined"
          className="mb-4"
          sx={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <CardContent>
            <Box className="flex justify-between items-center mb-4">
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={`Variant ${variantIndex + 1}`}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Stack>
              <Box>
                {
                  variants.length > 1 &&
                  <IconButton
                  color="error"
                  onClick={() => removeVariant(variantIndex)}
                  disabled={variants.length === 1}
                  size="small"
                >
                  <Delete />
                </IconButton>
                }
                <Button
                  startIcon={<Add />}
                  onClick={addVariant}
                  variant="outlined"
                  color="primary"
                  className="mt-4"
                >
                  Add Variant
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{xs:12,md:6}}>
                <TextInput
                  name={`variants.${variantIndex}.name`}
                  label="Variant Type"
                  placeholder="e.g. Color, Size, Material, etc."
                  required
                />
              </Grid>

              <Grid size={{xs:12,md:6}}>
                {variant.attributes.map((attribute, attributeIndex) => (
                  <Grid
                    container
                    spacing={2}
                    key={`attribute-${variantIndex}-${attributeIndex}`}
                    alignItems="center"
                    className="mb-3"
                  >
                    <Grid size={{xs:12,md:5}}>
                      <TextInput
                        name={`variants.${variantIndex}.attributes.${attributeIndex}.value`}
                        label="Option Value"
                        placeholder="e.g. Red, Small, Cotton, etc."
                        required
                      />
                    </Grid>
                    <Grid size={{xs:12,md:5}}>
                      <TextInput
                        name={`variants.${variantIndex}.attributes.${attributeIndex}.quantity`}
                        label="Stock"
                        type="number"
                        placeholder="0"
                        required
                      />
                    </Grid>
                    <Grid size={{xs:12,md:2}}>
                      {attributeIndex > 0 && (
                        <IconButton
                          color="error"
                          onClick={() =>
                            removeAttribute(variantIndex, attributeIndex)
                          }
                          size="small"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
                <Box className="mt-2">
                  <Button
                    startIcon={<Add />}
                    onClick={() => addAttribute(variantIndex)}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Add Option
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default VariantsSection;
