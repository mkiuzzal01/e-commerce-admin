import { Box } from "@mui/material";
import { useAllOrdersQuery } from "../../../redux/features/order/order.Api";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { OrderColumn } from "./components/OrderColumn";
import { useState } from "react";

const AllOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useAllOrdersQuery({});

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Order"
        rows={data?.data?.result || []}
        columns={OrderColumn}
        meta={data?.meta}
        updatePath="/update-order"
        viewPath="/view-order"
        search={searchTerm}
        setSearch={setSearchTerm}
        filter={status}
        setFilter={setStatus}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />
    </Box>
  );
};

export default AllOrder;
