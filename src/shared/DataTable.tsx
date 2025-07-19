import React, { useState, type ChangeEvent, type MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowsProp,
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface RowData {
  _id: string;
  slug?: string;
  [key: string]: unknown;
}

interface TableProps {
  rows: RowData[];
  columns: GridColDef[];
  title?: string;
  updatePath: string;
  viewPath: string;
  createPath: string;
  onDelete?: (id: string) => void;
  setSearch?: (value: string) => void;
  search?: string;
  setFilter?: (value: string) => void;
  filter?: string;
}

const DataTable: React.FC<TableProps> = ({
  rows,
  columns,
  title = "Data Table",
  updatePath,
  viewPath,
  createPath,
  onDelete,
  setSearch,
  search = "",
  setFilter,
  filter = "",
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

  const filteredRows: GridRowsProp = rows.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params: GridRenderCellParams<any, RowData>) => (
      <>
        <IconButton
          onClick={(e) => handleMenuOpen(e, params.row._id)}
          size="small"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor) && selectedRowId === params.row._id}
          onClose={handleMenuClose}
        >
          {onDelete && (
            <MenuItem
              onClick={() => {
                onDelete(params.row._id);
                handleMenuClose();
              }}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              navigate(`${updatePath}/${params.row.slug ?? params.row._id}`);
              handleMenuClose();
            }}
            sx={{ color: "primary.main" }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`${viewPath}/${params.row.slug ?? params.row._id}`);
              handleMenuClose();
            }}
            sx={{ color: "primary.main" }}
          >
            <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} /> View
          </MenuItem>
        </Menu>
      </>
    ),
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
      >
        {title}
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid size={{ xl: 12, md: 4 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Fab
              size="small"
              color="warning"
              onClick={() => navigate(-1)}
              title="Go back"
            >
              <ArrowBackIcon />
            </Fab>
            <Link to={createPath}>
              <Fab size="small" color="primary" title="Add New">
                <AddIcon />
              </Fab>
            </Link>
          </Box>
        </Grid>

        <Grid size={{ xl: 12, md: 4 }}>
          <TextField
            label="Search"
            fullWidth
            variant="outlined"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch?.(e.target.value)
            }
          />
        </Grid>

        <Grid size={{ xl: 12, md: 4 }}>
          <TextField
            label="Filter (optional)"
            fullWidth
            variant="outlined"
            value={filter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter?.(e.target.value)
            }
          />
        </Grid>
      </Grid>

      <DataGrid
        rows={filteredRows}
        columns={[...columns, actionColumn]}
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        autoHeight
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
