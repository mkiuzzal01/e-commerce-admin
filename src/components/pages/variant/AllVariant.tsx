/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useAllVariantQuery,
  useDeleteVariantMutation,
} from "../../../redux/features/variant/variant-api";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";
import { variantColumn } from "./components/Columns";
import { Box } from "@mui/material";

const AllVariant = () => {
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [deleteVariant] = useDeleteVariantMutation();

  const queryParams: Record<string, any> = {
    page,
    limit: 10,
  };
  if (search.trim()) queryParams.searchTerm = search.trim();

  const { data, isLoading, refetch } = useAllVariantQuery({queryParams});

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete Variant?",
      text: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Variant has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      // console.log(id);
      await deleteVariant(id).unwrap();
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
  //handle loading:
  if (isLoading) return <Loader />;
  return (
    <Box>
      {" "}
      <DataTable
        title="Product Variant"
        rows={data?.data?.result || []}
        meta={data?.data?.meta}
        columns={variantColumn}
        onDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        page={page}
        createPath="/create-variant"
        updatePath="/update-variant"
        viewPath="/view-attributes"
      />
    </Box>
  );
};

export default AllVariant;
