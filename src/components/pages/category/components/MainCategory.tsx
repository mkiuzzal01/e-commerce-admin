import { Avatar, Fab } from "@mui/material";
import {
  useAllMainCategoryQuery,
  useDeleteMainCategoryMutation,
} from "../../../../redux/features/category/category-api";
import DataTable from "../../../../shared/DataTable";
import Loader from "../../../../shared/Loader";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { showAlert } from "../../../utils/tost-alert/showAlert";
import { useToast } from "../../../utils/tost-alert/ToastProvider";

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
  {
    field: "isActive",
    headerName: "Is Active",
    minWidth: 200,
  },
];

export default function MainCategory() {
  const [search, setSearch] = useState<string>("");
  const { showToast } = useToast();
  const { data, isLoading, refetch } = useAllMainCategoryQuery({ search });
  const [deleteMainCategory, { isLoading: isDeleting }] =
    useDeleteMainCategoryMutation();

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
      await deleteMainCategory(id).unwrap();
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

  console.log(data);
  return (
    <>
      <DataTable
        rows={data?.data?.result || []}
        columns={columns}
        onDelete={handleDelete}
        title="Main Categories"
        search={search}
        setSearch={setSearch}
        createPath="/create-category"
        updatePath="/update-main-category"
        viewPath="/view-categories"
      />
    </>
  );
}
