import { useState } from "react";
import Loader from "../../../shared/Loader";
import { Box } from "@mui/material";
import DataTable from "../../../shared/DataTable";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";
import { advertisementColumn } from "./components/advertisementColumn";
import {
  useDeleteAdvertisementMutation,
  useGetAllAdvertisementsQuery,
} from "../../../redux/features/advertisement/advertisement.api";

const AllAdvertisement = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);

  const [deleteProduct] = useDeleteAdvertisementMutation();
  const { data, isLoading, refetch } = useGetAllAdvertisementsQuery({});

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete Advertisement",
      text: "Are you sure you want to delete this advertisement?",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Advertisement has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      await deleteProduct(id).unwrap();
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

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <DataTable
        title="All Advertisement"
        rows={data?.data?.result || []}
        columns={advertisementColumn}
        meta={data?.meta}
        updatePath="/update-advertisement"
        createPath="/create-advertisement"
        onDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        filter={status}
        setFilter={setStatus}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export default AllAdvertisement;
