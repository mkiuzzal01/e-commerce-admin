import { useParams } from "react-router-dom";
import {
  useSingleUserBySlugQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/user-api";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import FormHeader from "../../utils/FormHeader";
import SectionHeader from "../../utils/section/SectionHeader";
import Loader from "../../../shared/Loader";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import { GrAction } from "react-icons/gr";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import type { FieldValue } from "react-hook-form";
import RadioInput from "../../utils/input-fields/RadioInput";
import { MdSecurity } from "react-icons/md";

export default function UpdateUsers() {
  const { slug } = useParams();
  const { data: singleUser, isLoading: userLoading } = useSingleUserBySlugQuery(
    slug ?? ""
  );
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { showToast } = useToast();

  const getDefaultValues = () => {
    const baseValues = {
      status: singleUser?.data?.status,
      isDeleted: Boolean(singleUser?.data.isDeleted),
      role: singleUser?.data?.role,
    };

    return baseValues;
  };

  //submit the updated data
  const onSubmit = async (value: FieldValue<any>) => {
    console.log(value);
    try {
      const updatedData = {
        id: singleUser?.data?._id,
        ...value,
      };

      const { data } = await updateUser(updatedData);

      if (data?.success) {
        showToast({
          message: data?.message || "User updated successfully!",
          duration: 300,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
      }
    } catch {
      showToast({
        message: "Failed to update user.",
        duration: 300,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  const isLoading = userLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm
          onSubmit={onSubmit}
          defaultValues={getDefaultValues()}
          key={singleUser?.role}
        >
          <FormHeader
            title={"Update User"}
            subTitle={"Please fill in authentic details below."}
          />

          {/* Role Section */}
          <SectionHeader
            icon={<GrAction />}
            title="Role Information"
            subtitle="Choose the user role"
          />

          <Box sx={{ mb: 3 }}>
            <SelectInputField
              name="role"
              label="Role"
              options={["admin", "seller"]}
              requiredMessage="Select a role"
            />
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 12 }}>
              <SectionHeader
                icon={<MdSecurity />}
                title="User Status"
                subtitle="Update the status and profile settings"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <SelectInputField
                name="status"
                label="Profile Status"
                options={["active", "inactive", "blocked", "leaved"]}
                requiredMessage="Profile Status is required"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RadioInput
                name="isDeleted"
                label="Profile Deletion Status"
                options={[
                  { label: "Active", value: false },
                  { label: "Deleted", value: true },
                ]}
              />
            </Grid>

            {/* Submit Button */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                {isUpdating ? <CircularProgress /> : "Update User"}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
