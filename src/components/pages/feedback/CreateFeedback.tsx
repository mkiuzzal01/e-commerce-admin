import { Box, Button, Grid, Paper } from "@mui/material";
import FormHeader from "../../utils/FormHeader";
import ReusableForm from "../../../shared/ReusableFrom";
import TextInput from "../../utils/input-fields/TextInput";

type CreateFeedbackProps = {
  Description: string;
};
const CreateFeedback = () => {
  const onSubmit = (data: CreateFeedbackProps) => {
    console.log(data);
  };
  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create your feedback"
          subTitle="Provide your proper information"
        />
        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={3} mt={4}>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextInput
                name="description"
                label="Description"
                multiline
                row={4}
                required
              />
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateFeedback;
