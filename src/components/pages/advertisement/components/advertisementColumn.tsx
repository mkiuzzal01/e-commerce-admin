import { Avatar, Fab } from "@mui/material";

export const advertisementColumn = [
  {
    field: "image",
    headerName: "Image",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <Fab size="small" color="primary">
        <Avatar src={params.row?.image?.photo?.url} />
      </Fab>
    ),
  },
  { field: "title", headerName: "Title", width: 200 },
  { field: "subTitle", headerName: "Sub Title", width: 150 },
  { field: "isActive", headerName: "Is Active", width: 120 },

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
