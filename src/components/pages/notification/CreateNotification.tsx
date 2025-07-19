import { Box, Button, Grid, Paper } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import TextInput from "../../utils/input-fields/TextInput";
type NotificationProps = {
  title: string;
  subTitle: string;
  description: string;
};
const CreateNotification = () => {
  const onSubmit = (data: NotificationProps) => {
    console.log(data);
  };
  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <FormHeader
          title="Create your notification"
          subTitle="Provide your proper information"
        />
        <ReusableForm onSubmit={onSubmit}>
          <Grid container spacing={3} mt={4}>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextInput name="title" label="Title" required />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextInput name="subTitle" label="Sub Title" required />
            </Grid>
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

export default CreateNotification;
