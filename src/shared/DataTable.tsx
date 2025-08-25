/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  DataGrid,
  type GridColDef,
  type GridPaginationModel,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Fab,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import UpdateIcon from "@mui/icons-material/Update";
import ReusableModal from "./ReusableModal";

interface RowData {
  _id: string;
  slug?: string;
  [key: string]: unknown;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface TableProps {
  rows: RowData[];
  columns: GridColDef[];
  title?: string;
  updatePath?: string;
  viewPath?: string;
  createPath?: string;
  onDelete?: (id: string) => void;
  onUpdateStatus?: (id: string) => void;
  setSearch?: (value: string) => void;
  search?: string;
  setFilter?: (value: string) => void;
  filter?: string;
  options?: string[];
  page?: number;
  setPage?: (value: number) => void;
  meta?: Meta;

  // Modal
  modalOpen?: boolean;
  modalClose?: () => void;
  modalTitle?: string;
  children?: React.ReactNode;
}

const DataTable: React.FC<TableProps> = ({
  rows,
  columns,
  title = "Data Table",
  updatePath,
  viewPath,
  createPath,
  onDelete,
  onUpdateStatus,
  setSearch,
  search = "",
  setFilter,
  filter = "",
  page = 1,
  options,
  setPage,
  meta,
  modalTitle,
  modalOpen = false,
  modalClose,
  children,
}) => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuAnchor(e.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRowId(null);
  };

  const handlePaginationChange = (model: GridPaginationModel) => {
    setPage?.(model.page + 1);
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, RowData>) => (
      <>
        <IconButton
          onClick={(e) => handleMenuOpen(e, params?.row?._id)}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor) && selectedRowId === params?.row?._id}
          onClose={handleMenuClose}
        >
          {viewPath && (
            <MenuItem
              onClick={() => {
                navigate(
                  `${viewPath}/${params?.row?.slug || params?.row?._id}`
                );
                handleMenuClose();
              }}
              sx={{ color: "primary.main" }}
            >
              <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} /> View
            </MenuItem>
          )}
          {updatePath && (
            <MenuItem
              onClick={() => {
                navigate(
                  `${updatePath}/${params?.row?.slug ?? params?.row?._id}`
                );
                handleMenuClose();
              }}
              sx={{ color: "primary.main" }}
            >
              <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
          )}
          {onUpdateStatus && (
            <MenuItem
              onClick={() => {
                onUpdateStatus(params?.row?.slug);
                handleMenuClose();
              }}
              sx={{ color: "info.main" }}
            >
              <UpdateIcon fontSize="small" sx={{ mr: 1 }} /> Update Status
            </MenuItem>
          )}
          {onDelete && (
            <MenuItem
              onClick={() => {
                onDelete(params?.row?._id);
                handleMenuClose();
              }}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          )}
        </Menu>
      </>
    ),
  };

  return (
    <Box>
      {/* Title */}
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
      >
        {title}
      </Typography>

      {/* Toolbar (back, add, search, filter) */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Fab
              size="small"
              color="warning"
              onClick={() => navigate(-1)}
              title="Go back"
            >
              <ArrowBackIcon />
            </Fab>
            {createPath && (
              <Link to={createPath}>
                <Fab size="small" color="primary" title="Add New">
                  <AddIcon />
                </Fab>
              </Link>
            )}
          </Box>
        </Grid>

        {(setSearch || setFilter) && (
          <Grid size={{ xs: 12, md: 10 }}>
            <Grid container spacing={2}>
              {setSearch && (
                <Grid size={{ xs: 12, md: options ? 6 : 12 }}>
                  <TextField
                    label="Search"
                    fullWidth
                    variant="outlined"
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                  />
                </Grid>
              )}
              {options && (
                <Grid size={{ xs: 12, md: setSearch ? 6 : 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Filter by status</InputLabel>
                    <Select
                      value={filter || ""}
                      label="Filter by status"
                      onChange={(e) => setFilter?.(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {options.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        autoHeight
        paginationMode="server"
        rowCount={meta?.total ?? 0}
        paginationModel={{
          page: (page ?? 1) - 1,
          pageSize: meta?.limit ?? 10,
        }}
        onPaginationModelChange={handlePaginationChange}
      />

      {/* Modal */}
      {modalOpen && modalClose && (
        <ReusableModal title={modalTitle} onClose={modalClose} open={modalOpen}>
          {children}
        </ReusableModal>
      )}
    </Box>
  );
};

export default DataTable;
