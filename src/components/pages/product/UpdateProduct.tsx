import { useParams } from "react-router-dom";
import { useSingleProductBySlugQuery } from "../../../redux/features/product/product.api";
import Loader from "../../../shared/Loader";
import ProductForm from "../../utils/forms/ProductForm";
import { Box } from "@mui/material";

export default function UpdateProduct() {
  const { slug } = useParams();
  const { data, isLoading } = useSingleProductBySlugQuery(slug ? slug : "");

  if (isLoading) return <Loader />;

  return (
    <Box>
      <ProductForm id={data?.data?.id} initialData={data?.data} />
    </Box>
  );
}
