import { useState } from "react";
import {
  useAllVariantQuery,
  useDeleteVariantMutation,
} from "../../../redux/features/variant/variant-api";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { Avatar, Fab } from "@mui/material";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";

const columns = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Fab size="small" color="primary">
        <Avatar>{params?.row?.name?.charAt(0)?.toUpperCase() || "M"}</Avatar>
      </Fab>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
  },
  {
    field: "createdAt",
    headerName: "Created Time",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => {
      const date = params.row.createdAt;
      return date
        ? new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A";
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated Time",
    minWidth: 200,
    renderCell: (params: GridRenderCellParams) => {
      const date = params.row.updatedAt;
      return date
        ? new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A";
    },
  },
];

const AllVariant = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, refetch } = useAllVariantQuery({});
  const [deleteVariant] = useDeleteVariantMutation();
  const { showToast } = useToast();

  console.log(data);

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
      console.log(id);
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
    <>
      {" "}
      <DataTable
        rows={data?.data?.result || []}
        columns={columns}
        onDelete={handleDelete}
        title="Product Variant"
        search={search}
        setSearch={setSearch}
        createPath="/create-variant"
        updatePath="/update-variant"
        viewPath="/view-attributes"
      />
    </>
  );
};

export default AllVariant;
