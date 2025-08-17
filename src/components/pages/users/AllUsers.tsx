/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { useState } from "react";
import { useAllUsersQuery } from "../../../redux/features/user/user-api";
import Loader from "../../../shared/Loader";
import DataTable from "../../../shared/DataTable";
import { Avatar, Fab } from "@mui/material";

const userColumns = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: () => (
      <Fab size="small" color="primary">
        <Avatar src="/broken-image.jpg" />
      </Fab>
    ),
  },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 150 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "isDeleted", headerName: "Is Deleted", width: 120 },

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

const options = ["in-progress", "blocked"];

const AllUsers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");

  const queryParams: Record<string, any> = {
    page,
    limit: 10,
  };
  if (search.trim()) queryParams.searchTerm = search.trim();
  if (status) queryParams.status = status;

  const { data, isLoading } = useAllUsersQuery({ queryParams });

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Users"
        rows={data?.data?.result || []}
        columns={userColumns}
        meta={data?.data?.meta}
        viewPath="/view-user"
        options={options}
        search={search}
        setSearch={setSearch}
        filter={status}
        setFilter={setStatus}
        setPage={setPage}
      />
    </Box>
  );
};

export default AllUsers;
