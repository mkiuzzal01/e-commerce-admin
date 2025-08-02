import { useState } from "react";
import Loader from "../../../shared/Loader";
import { Box } from "@mui/material";
import { useAllProductsQuery } from "../../../redux/features/product/product.api";
import DataTable from "../../../shared/DataTable";
import { UserColumn } from "./components/Column";

const AllProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useAllProductsQuery({});

  if (isLoading) return <Loader />;
  console.log(data);

  console.log(data);
  return (
    <Box p={3}>
      <DataTable
        title="All Product"
        rows={data?.data?.result || []}
        columns={UserColumn}
        meta={data?.meta}
        updatePath="/update-product"
        createPath="/create-product"
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

export default AllProduct;
