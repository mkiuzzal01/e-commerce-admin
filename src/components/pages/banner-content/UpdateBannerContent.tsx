import { Box } from "@mui/material";
import BannerContentForm from "../../utils/forms/BannerContentForm";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
import { useGetSingleBannerContentQuery } from "../../../redux/features/banner-content/banner_content.api";

export default function UpdateBannerContent() {
  const { slug } = useParams();
  const { data, isLoading } = useGetSingleBannerContentQuery(slug ? slug : "");
  // console.log(data);
  if (isLoading) return <Loader />;
  return (
    <Box>
      <BannerContentForm initialData={data?.data} />
    </Box>
  );
}
