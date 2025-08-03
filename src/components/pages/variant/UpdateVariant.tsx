import { Box } from "@mui/material";
import { useSingleVariantQuery } from "../../../redux/features/variant/variant-api";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
import VariantForm from "../../utils/forms/VariantForm";

export default function UpdateVariant() {
  const { slug } = useParams();
  const { data, isLoading } = useSingleVariantQuery(slug ?? "");

  if (isLoading) return <Loader />;

  return (
    <Box>
      <VariantForm initialData={data?.data} />
    </Box>
  );
}
