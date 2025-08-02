import type { GridColDef } from "@mui/x-data-grid";
import {
  useAllSubCategoryQuery,
  useDeleteSubCategoryMutation,
} from "../../../../redux/features/category/category-api";
import DataTable from "../../../../shared/DataTable";
import Loader from "../../../../shared/Loader";
import { Avatar, Fab } from "@mui/material";
import { showAlert } from "../../../utils/tost-alert/showAlert";
import { useToast } from "../../../utils/tost-alert/ToastProvider";
import { useState } from "react";

const subCategoryColumns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Fab size="small" color="primary">
        <Avatar>{params?.row?.name?.charAt(0)?.toUpperCase() || "M"}</Avatar>
      </Fab>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created Time",
    width: 200,
    renderCell: (params) => {
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
    width: 200,
    renderCell: (params) => {
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

export default function SubCategories() {
  const { showToast } = useToast();
  const [search, setSearch] = useState<string>("");

  const {
    data: subCate,
    isLoading: loadingData,
    refetch,
  } = useAllSubCategoryQuery({ search });

  const [deleteSubCategory, { isLoading: deleting }] =
    useDeleteSubCategoryMutation();

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
      await deleteSubCategory(id).unwrap();
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
  if (loadingData || deleting) return <Loader />;

  return (
    <div>
      <DataTable
        title="All Sub Categories"
        rows={subCate?.data?.result || []}
        columns={subCategoryColumns}
        updatePath="/update-sub-category"
        createPath="/create-category"
        onDelete={handleDelete}
        setSearch={setSearch}
        search={search}
      />
    </div>
  );
}
