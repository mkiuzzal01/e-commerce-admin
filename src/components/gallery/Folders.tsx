import { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import { Search } from "lucide-react";
import image1 from "../../assets/mount-a-folder-as-a-drive.webp";
import ReusableModal from "../../shared/ReusableModal";
import ReusableForm from "../../shared/ReusableFrom";
import TextInput from "../utils/input-fields/TextInput";
import Empty from "../../shared/Empty";
import {
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useGetFoldersQuery,
  useUpdateFolderMutation,
} from "../../redux/features/gallery/folder-api";
import { useToast } from "../utils/tost-alert/ToastProvider";
import type { FieldValue } from "react-hook-form";
import type { TFolder } from "./TGallery";

const Folders = () => {
  const theme = useTheme();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<TFolder | null>(null);

  const { data: foldersData, refetch } = useGetFoldersQuery({
    search: searchTerm,
  });
  const [createFolder, { isLoading: isCreating }] = useCreateFolderMutation();
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();
  const [updateFolder, { isLoading: isUpdating }] = useUpdateFolderMutation();
  const { showToast } = useToast();

  const handleCreate = async (data: FieldValue<any>) => {
    try {
      const res = await createFolder({ name: data.folderName });
      if (res.data.success) {
        showToast({ message: res.data.message, type: "success" });
        refetch();
        setCreateOpen(false);
      }
    } catch {
      showToast({ message: "Failed to create folder", type: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFolder(id);
      if (res.data.success) {
        showToast({ message: res.data.message, type: "success" });
        refetch();
      }
    } catch {
      showToast({ message: "Failed to delete folder", type: "error" });
    }
  };

  const handleEdit = async (folder: FieldValue<TFolder>) => {
    try {
      const updateFolderData: TFolder = {
        _id: selectedFolder?._id || "",
        name: (folder as { folderName: string }).folderName || "",
      };

      const res = await updateFolder(updateFolderData);
      if (res.data.success) {
        showToast({
          message: res?.data?.message || "Folder updated successfully",
          duration: 2000,
          position: {
            horizontal: "center",
            vertical: "top",
          },
          type: "success",
        });
      }
      setEditOpen(false);
      refetch();
    } catch {
      showToast({
        message: "Something wrong",
        duration: 2000,
        position: {
          horizontal: "center",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  return (
    <Paper sx={{ p: 3, my: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <OutlinedInput
            fullWidth
            placeholder="Search folders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton>
                  <Search size={18} />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} textAlign="right">
          <Button variant="contained" onClick={() => setCreateOpen(true)}>
            + Create Folder
          </Button>
        </Grid>
      </Grid>

      <Box mt={3} mb={2} borderBottom={`1px solid ${theme.palette.divider}`} />

      {/* Folder Grid */}
      {foldersData?.data?.result?.length ? (
        <Grid container spacing={2}>
          {foldersData.data.result.map((folder: TFolder) => (
            <Grid size={{ xs: 6, md: 2 }} key={folder._id}>
              <Paper
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                  borderRadius: 2,
                  p: 1,
                  transition: "0.3s",
                  "&:hover .overlay": {
                    opacity: 0.6,
                  },
                  "&:hover .folder-actions": {
                    opacity: 1,
                    visibility: "visible",
                  },
                }}
              >
                {/* Folder Image */}
                <img
                  src={image1}
                  alt={folder.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                {/* Folder Name */}
                <Typography variant="h6" mt={1}>
                  {folder.name}
                </Typography>

                {/* Dark Overlay on Hover */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000",
                    opacity: 0,
                    transition: "0.3s",
                    zIndex: 1,
                    borderRadius: 2,
                  }}
                />

                {/* Action Icons */}
                <Box
                  className="folder-actions"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                    opacity: 0,
                    visibility: "hidden",
                    zIndex: 2,
                    transition: "0.3s",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      setSelectedFolder(folder);
                      setEditOpen(true);
                    }}
                    sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(folder._id)}
                    sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    {isDeleting ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty heading="No folders found." refetch={refetch} />
      )}

      {/* Create Modal */}
      <ReusableModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        width={600}
      >
        <Typography variant="h6" mb={2}>
          Create New Folder
        </Typography>
        <ReusableForm onSubmit={handleCreate}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput name="folderName" label="Folder Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isCreating}
              >
                {isCreating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </ReusableModal>

      {/* Edit Modal */}
      <ReusableModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        width={600}
      >
        <Typography variant="h6" mb={2}>
          Edit Folder
        </Typography>
        <ReusableForm
          onSubmit={handleEdit}
          defaultValues={{ folderName: selectedFolder?.name }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput name="folderName" label="Folder Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button variant="contained" type="submit" fullWidth>
                {isUpdating ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Update"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </ReusableModal>
    </Paper>
  );
};

export default Folders;
