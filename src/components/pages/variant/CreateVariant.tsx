import { Box, Grid, IconButton, Paper, Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import TextInput from "../../utils/input-fields/TextInput";
import ReusableForm from "../../../shared/ReusableFrom";
import { useState } from "react";
import FormHeader from "../../utils/FormHeader";

type AttributeValue = {
  value: string;
};

type CreateVariantFormValues = {
  name: string;
  attributes: AttributeValue[];
};

const CreateVariant = () => {
  const [attributes, setAttributes] = useState<AttributeValue[]>([
    { value: "" },
  ]);

  const removeAttribute = (index: number) => {
    const updated = attributes.filter((_, idx) => idx !== index);
    setAttributes(updated);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { value: "" }]);
  };

  const onSubmit = (data: CreateVariantFormValues) => {
    console.log("Variant Submitted:", data);
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title="Create a New Variant"
          subTitle="Define the type of variant such as color, size, material, etc."
        />

        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 12 }} mt={4}>
              <TextInput
                name="name"
                label="Variant Name"
                placeholder="e.g. Color, Size"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              {attributes.map((_, idx) => (
                <Grid key={idx} container spacing={2} alignItems="center">
                  <Grid size={{ xs: 10, md: 10 }} mb={2}>
                    <TextInput
                      name={`attributes[${idx}].value`}
                      label="Value"
                      placeholder="e.g. Red, Large, Cotton"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 2, md: 2 }}>
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

            <Grid size={{ xs: 12, md: 12 }}>
              <Button type="submit" variant="contained">
                Submit Variant
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateVariant;
