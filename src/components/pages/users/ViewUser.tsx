import { useParams } from "react-router-dom";
import { useGetSellerByIdQuery } from "../../../redux/features/seller/seller-api";
import { useEffect, useState } from "react";
import { useGetStakeHolderByIdQuery } from "../../../redux/features/stake-holder/stakeHolder-api";
import SellerDetails from "../../utils/users/SellerDetails";
import StakeHolderDetails from "../../utils/users/StakeHolderDetails";
import { useSingleUserBySlugQuery } from "../../../redux/features/user/user-api";

export default function ViewUser() {
  const [isSeller, setSeller] = useState<string>("");
  const [isStackHolder, setStackHolder] = useState<string>("");

  const { slug } = useParams();
  const { data: singleUser } = useSingleUserBySlugQuery(slug ?? "");

  useEffect(() => {
    if (singleUser?.data?.role === "seller") {
      setSeller(singleUser?.data?._id);
    } else if (singleUser?.data?.role === "admin") {
      setStackHolder(singleUser?.data?._id);
    }
  }, [singleUser]);

  const { data: singleSeller } = useGetSellerByIdQuery(isSeller, {
    skip: !isSeller,
  });
  const { data: singleStackHolder } = useGetStakeHolderByIdQuery(
    isStackHolder,
    {
      skip: !isStackHolder,
    }
  );

  return (
    <div>
      {singleUser?.data?.role === "seller" && singleSeller?.data && (
        <SellerDetails seller={singleSeller.data} />
      )}

      {singleUser?.data?.role === "admin" && singleStackHolder?.data && (
        <StakeHolderDetails stakeHolder={singleStackHolder.data} />
      )}
    </div>
  );
}
