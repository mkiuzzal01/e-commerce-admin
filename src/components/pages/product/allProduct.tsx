/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Loader from "../../../shared/Loader";
import { Box } from "@mui/material";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../../redux/features/product/product.api";
import DataTable from "../../../shared/DataTable";
import { ProductColumn } from "./components/ProductColumn";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";

const AllProduct = () => {
  const { showToast } = useToast();
  const [deleteProduct] = useDeleteProductMutation();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);

  const queryParams: Record<string, any> = {
    page,
    limit: 10,
  };

  if (search.trim()) queryParams.searchTerm = search.trim();

  const { data, isLoading, refetch } = useAllProductsQuery({
    queryParams,
  });

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Product has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      // console.log(id);
      await deleteProduct(id).unwrap();
      refetch();
    } catch {
      showToast({
        message: "Something went wrong while deleting.",
        type: "error",
        duration: 3000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Product"
        rows={data?.data?.result || []}
        meta={data?.data?.meta}
        columns={ProductColumn}
        updatePath="/update-product"
        createPath="/create-product"
        onDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        filter={status}
        setFilter={setStatus}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export default AllProduct;
