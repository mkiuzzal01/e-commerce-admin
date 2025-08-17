import { Box, Button, Grid, Paper } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import {
  useOrderStatusChangeMutation,
  useSingleOrderQuery,
} from "../../../redux/features/order/order.Api";
import type { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormHeader from "../../utils/FormHeader";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";

const options = [
  "PROCESSING",
  "READY_FOR_PICKUP",
  "DISPATCHED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "DELIVERY_FAILED",
  "RETURN_REQUESTED",
  "RETURNED",
  "CANCELLED",
];

export default function UpdateOrder() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { slug } = useParams<{ slug: string }>();
  const { data: order, isLoading } = useSingleOrderQuery(slug ? slug : "");

  const [changeStatus, { isLoading: isChanging }] =
    useOrderStatusChangeMutation();

  const handleSubmit = async (value: FieldValues) => {
    try {
      const { data } = await changeStatus({
        id: order?.data?._id,
        orderStatus: value?.orderStatus,
      });
      if (data?.success) {
        showToast({
          message: "Order status updated successfully",
          type: "success",
        });
        navigate("/all-order");
      }
    } catch {
      showToast({
        message: "Failed to update order status",
        type: "error",
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title="Update Order Status"
          subTitle="Change the status of the order"
        />
        <ReusableForm onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid size={{ xs: 12 }}>
              <SelectInputField
                label="Order Status"
                options={options}
                defaultValue={order?.data?.orderStatus}
                name="orderStatus"
                requiredMessage="Order status is required"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isChanging ? "Updating..." : "Update Status"}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
