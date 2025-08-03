import { useParams } from "react-router-dom";
import { useGetSingleAdvertisementQuery } from "../../../redux/features/advertisement/advertisement.api";
import Loader from "../../../shared/Loader";
import { Box } from "@mui/material";
import AdvertisementForm from "../../utils/forms/AdvertisementForm";

export default function UpdateAdvertisement() {
  const { slug } = useParams();
  const { data, isLoading } = useGetSingleAdvertisementQuery(slug ? slug : "");
  if (isLoading) return <Loader />;
  return (
    <Box>
      <AdvertisementForm initialData={data?.data} />
    </Box>
  );
}
