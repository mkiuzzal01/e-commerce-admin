/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Paper } from "@mui/material";
import { useState } from "react";
import VariantsSection from "../../utils/VariantsSection";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";

type Attribute = {
  value: string;
  quantity: number;
};

type OrderVariant = {
  productId?: string;
  name: string;
  attributes: Attribute[];
};

const CreateOrder = () => {
  const [variants, setVariants] = useState<OrderVariant[]>([
    { name: "", attributes: [{ value: "", quantity: 0 }] },
  ]);

  const onSubmit = (formData: Record<string, any>) => {
    console.log("Submitted Order Data:", { ...formData, variants });
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create Order"
          subTitle="Take a order with provide proper information"
        />
        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={4} mt={2}>
            <Grid size={{ lg: 12 }}>
              <VariantsSection variants={variants} setVariants={setVariants} />
            </Grid>
            <Grid size={{ lg: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Submit Order
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateOrder;
