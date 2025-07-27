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

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useAllUsersQuery({});

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Users"
        rows={data?.data?.result || []}
        columns={userColumns}
        meta={data?.meta}
        updatePath="/update-user"
        createPath="/create-user"
        viewPath="/view-user"
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

export default AllUsers;
