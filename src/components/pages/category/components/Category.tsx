import type { GridRenderCellParams } from "@mui/x-data-grid";
import {
  useAllCategoryQuery,
  useDeleteCategoryMutation,
} from "../../../../redux/features/category/category-api";
import { Avatar, Fab } from "@mui/material";
import DataTable from "../../../../shared/DataTable";
import Loader from "../../../../shared/Loader";
import { showAlert } from "../../../utils/tost-alert/showAlert";
import { useToast } from "../../../utils/tost-alert/ToastProvider";
import { useState } from "react";

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

export default function Category() {
  const [search, setSearch] = useState<string>("");
  const { showToast } = useToast();
  const { data, isLoading, refetch } = useAllCategoryQuery({ search });
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete Sub-category?",
      text: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Sub-category has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      await deleteCategory(id).unwrap();
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
  if (isLoading || isDeleting) return <Loader />;
  console.log(data?.result);
  return (
    <div>
      <DataTable
        rows={data?.result || []}
        columns={columns}
        search={search}
        onDelete={handleDelete}
        setSearch={setSearch}
        title="Categories"
        createPath="/create-category"
        updatePath="/update-category"
      />
    </div>
  );
}
