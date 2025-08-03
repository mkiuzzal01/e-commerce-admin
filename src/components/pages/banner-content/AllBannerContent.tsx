import { useState } from "react";
import Loader from "../../../shared/Loader";
import { Box } from "@mui/material";
import DataTable from "../../../shared/DataTable";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";
import { bannerContentColumn } from "./components/bannerContentColumn";
import {
  useDeleteBannerContentMutation,
  useGetAllBannerContentsQuery,
} from "../../../redux/features/banner-content/banner_content.api";

const AllBannerContent = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [deleteContent] = useDeleteBannerContentMutation();
  const { data, isLoading, refetch } = useGetAllBannerContentsQuery({
    searchTerm,
  });

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete content",
      text: "Are you sure you want to delete this content?",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Content has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      await deleteContent(id).unwrap();
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
        title="All Content"
        rows={data?.data?.result || []}
        columns={bannerContentColumn}
        meta={data?.meta}
        updatePath="/update-content"
        createPath="/create-content"
        onDelete={handleDelete}
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

export default AllBannerContent;
