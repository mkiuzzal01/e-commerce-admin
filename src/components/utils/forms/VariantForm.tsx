import { Box, Grid, IconButton, Paper, Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import TextInput from "../../utils/input-fields/TextInput";
import ReusableForm from "../../../shared/ReusableFrom";
import { useState, useEffect } from "react";
import FormHeader from "../../utils/FormHeader";
import {
  useCreateVariantMutation,
  useUpdateVariantMutation,
} from "../../../redux/features/variant/variant-api";
import type { FieldValues } from "react-hook-form";
import { useToast } from "../tost-alert/ToastProvider";

type AttributeValue = {
  value: string;
};

type Props = {
  id?: string;
  initialData?: FieldValues;
};

const VariantForm = ({ id, initialData }: Props) => {
  const { showToast } = useToast();
  const [attributes, setAttributes] = useState<AttributeValue[]>([
    { value: "" },
  ]);

  const [createVariant, { isLoading: isCreating }] = useCreateVariantMutation();
  const [updateVariant, { isLoading: isUpdating }] = useUpdateVariantMutation();

  useEffect(() => {
    if (initialData?.attributes?.length) {
      setAttributes(initialData.attributes);
    }
  }, [initialData]);

  const removeAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addAttribute = () => {
    setAttributes((prev) => [...prev, { value: "" }]);
  };

  const onSubmit = async (data: FieldValues) => {
    const formPayload = {
      name: data.name,
      attributes: data.attributes,
    };

    try {
      const res = id
        ? await updateVariant({ id, body: formPayload }).unwrap()
        : await createVariant(formPayload).unwrap();

      showToast({
        message: res.message || (id ? "Variant updated" : "Variant created"),
        type: "success",
      });
    } catch (err: any) {
      showToast({
        message: err?.data?.message || "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title={id ? "Update Variant" : "Create a New Variant"}
          subTitle="Define variant types like Color, Size, Material, etc."
        />

        <ReusableForm
          onSubmit={onSubmit}
          defaultValues={initialData || { attributes }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }} mt={4}>
              <TextInput
                name="name"
                label="Variant Name"
                placeholder="e.g. Color, Size"
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              {attributes.map((_, idx) => (
                <Grid key={idx} container spacing={2} alignItems="center">
                  <Grid size={{ xs: 10 }}>
                    <TextInput
                      name={`attributes[${idx}].value`}
                      label="Value"
                      placeholder="e.g. Red, Large, Cotton"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    {attributes.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeAttribute(idx)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}

              <Button
                onClick={addAttribute}
                variant="outlined"
                startIcon={<Add />}
                sx={{ mt: 2 }}
              >
                Add More Values
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isCreating || isUpdating}
              >
                {id ? "Update Variant" : "Create Variant"}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default VariantForm;
