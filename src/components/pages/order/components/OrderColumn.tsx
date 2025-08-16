/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Fab, Chip, Typography, Box } from "@mui/material";

export const OrderColumn = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => {
      const firstItem = params.row?.orderItems?.[0];
      const imageUrl = firstItem?.productId?.productImage?.photo?.url;
      return (
        <Fab size="small" color="primary">
          <Avatar src={imageUrl || ""} />
        </Fab>
      );
    },
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 200,
    renderCell: (params: any) => {
      const customer = params.row?.customerId;
      return (
        <Typography variant="body2" fontWeight={600}>
          {`${customer?.name?.firstName ?? ""} ${customer?.name?.middleName ?? ""} ${customer?.name?.lastName ?? ""}`.trim() ||
            "N/A"}
        </Typography>
      );
    },
  },
  {
    field: "contactInfo",
    headerName: "Contact Info",
    width: 200,
    renderCell: (params: any) => {
      const customer = params.row?.customerId;
      return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" color="text.secondary">
            {customer?.email || "N/A"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {customer?.phone || "N/A"}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "orderStatus",
    headerName: "Status",
    width: 130,
    renderCell: (params: any) => (
      <Chip
        label={params.row?.orderStatus ?? "N/A"}
        color={
          params.row?.orderStatus === "PENDING"
            ? "warning"
            : params.row?.orderStatus === "COMPLETED"
              ? "success"
              : "default"
        }
        size="small"
      />
    ),
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 130,
    renderCell: (params: any) =>
      `৳ ${(params.row?.totalPrice ?? 0).toFixed(2)}`,
  },
  {
    field: "createdAt",
    headerName: "Created Time",
    width: 180,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => {
      const dateValue = params.row?.createdAt;
      if (!dateValue) return "N/A";
      try {
        return new Date(dateValue).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return "Invalid date";
      }
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated Time",
    width: 180,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => {
      const dateValue = params.row?.updatedAt;
      if (!dateValue) return "N/A";
      try {
        return new Date(dateValue).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } catch {
        return "Invalid date";
      }
    },
  },
];
