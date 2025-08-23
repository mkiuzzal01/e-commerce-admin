/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useAllOrdersQuery } from "../../../redux/features/order/order.Api";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { OrderColumn } from "./components/OrderColumn";
import { useState } from "react";

const statusOptions = [
  "PENDING",
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

const AllOrder = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const queryParams: Record<string, any> = {
    page,
    limit: 10,
  };
  if (filter) queryParams.orderStatus = filter;

  const { data, isLoading } = useAllOrdersQuery({ queryParams });

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Order"
        rows={data?.data?.result || []}
        columns={OrderColumn}
        meta={data?.data?.meta}
        updatePath="/update-order"
        viewPath="/view-order"
        filter={filter}
        setFilter={setFilter}
        options={statusOptions}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export default AllOrder;
