import { useState } from "react";
import {
  useAllVariantQuery,
  useDeleteVariantMutation,
} from "../../../redux/features/variant/variant-api";
import DataTable from "../../../shared/DataTable";
import Loader from "../../../shared/Loader";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import { showAlert } from "../../utils/tost-alert/showAlert";
import { variantColumn } from "./components/Columns";



const AllVariant = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, refetch } = useAllVariantQuery({});
  const [deleteVariant] = useDeleteVariantMutation();
  const { showToast } = useToast();

  const handleDelete = async (id: string) => {
    const confirmed = await showAlert({
      title: "Delete Variant?",
      text: "This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      successText: "Variant has been deleted successfully.",
    });

    if (!confirmed) return;
    try {
      console.log(id);
      await deleteVariant(id).unwrap();
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
  if (isLoading) return <Loader />;
  return (
    <>
      {" "}
      <DataTable
        rows={data?.data?.result || []}
        columns={variantColumn}
        onDelete={handleDelete}
        title="Product Variant"
        search={search}
        setSearch={setSearch}
        createPath="/create-variant"
        updatePath="/update-variant"
        viewPath="/view-attributes"
      />
    </>
  );
};

export default AllVariant;
