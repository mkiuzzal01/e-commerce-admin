/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import {
  useOrderStatusChangeMutation,
  useSingleOrderQuery,
} from "../../../redux/features/order/order.Api";
import type { FieldValues } from "react-hook-form";
import FormHeader from "../../utils/FormHeader";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { useMemo } from "react";
import SelectInputField from "../../utils/input-fields/SelectInputField";

type Props = {
  slug: string | any;
  refetch: () => void;
  handleOpenModal: (open: boolean) => void;
};

// allowed transitions (same as backend)
const allowedStatusTransitions: Record<string, string[]> = {
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["READY_FOR_PICKUP", "CANCELLED"],
  READY_FOR_PICKUP: ["DISPATCHED"],
  DISPATCHED: ["OUT_FOR_DELIVERY"],
  OUT_FOR_DELIVERY: ["DELIVERED", "DELIVERY_FAILED"],
  DELIVERED: ["RETURN_REQUESTED"],
  DELIVERY_FAILED: ["RETURN_REQUESTED"],
  RETURN_REQUESTED: ["RETURNED"],
  RETURNED: [],
  CANCELLED: [],
};

export default function UpdateOrder({ slug, refetch, handleOpenModal }: Props) {
  const { showToast } = useToast();
  const { data: order, isLoading } = useSingleOrderQuery(slug ? slug : "");
  const [changeStatus, { isLoading: isChanging }] =
    useOrderStatusChangeMutation();

  const currentStatus = order?.data?.orderStatus || "N/A";

  // ✅ Memoize allowed statuses for cleaner UI
  const allowedNext = useMemo(
    () => allowedStatusTransitions[currentStatus] || [],
    [currentStatus]
  );

  if (isLoading) return <Loader />;

  const handleSubmit = async (value: FieldValues) => {
    const newStatus = value?.orderStatus;

    // 🔒 Double-check transition validity
    if (!allowedNext.includes(newStatus)) {
      showToast({
        message: `❌ Invalid transition: ${currentStatus} → ${newStatus}. Allowed: ${
          allowedNext.length ? allowedNext.join(", ") : "None"
        }`,
        type: "error",
      });
      return;
    }

    try {
      const { data } = await changeStatus({
        id: order?.data?._id,
        orderStatus: newStatus,
      });

      if (data?.success) {
        showToast({
          message: "✅ Order status updated successfully",
          type: "success",
        });
        refetch();
        handleOpenModal(false);
      }
    } catch (error: any) {
      console.error(error);
      showToast({
        message: error?.data?.message || "Failed to update order status",
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormHeader
          title="Update Order Status"
          subTitle="Change the status of this order"
        />

        <Box my={4}>
          {/* Current & Allowed Status Info */}
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Current Status:</strong> {currentStatus}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            <strong>Allowed Next:</strong>{" "}
            {allowedNext.length
              ? allowedNext.join(", ")
              : "No further transitions"}
          </Typography>
        </Box>

        <ReusableForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <SelectInputField
                label="Order Status"
                options={allowedNext}
                defaultValue=""
                name="orderStatus"
                requiredMessage="Order status is required"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                type="submit"
                disabled={isChanging || !allowedNext.length}
              >
                {isChanging ? "Updating..." : "Update Status"}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
}
