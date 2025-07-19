import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { Box, Button, Paper, Grid, CircularProgress } from "@mui/material";
import ReusableForm from "../../../shared/ReusableFrom";
import SelectInputField from "../../utils/input-fields/SelectInputField";
import TextInput from "../../utils/input-fields/TextInput";
import DateInput from "../../utils/input-fields/DateInput";
import SectionHeader from "../../utils/section/SectionHeader";
import { GrAction } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import { MdAccountBalance, MdSecurity } from "react-icons/md";
import FormHeader from "../../utils/FormHeader";
import { useCreateSellerMutation } from "../../../redux/features/seller/seller-api";
import { useCreateStakeHolderMutation } from "../../../redux/features/stake-holder/stakeHolder-api";
import { useToast } from "../../utils/tost-alert/ToastProvider";
import Loader from "../../../shared/Loader";
import type { FieldValues } from "react-hook-form";
import ReusableDrawer from "../../../shared/ReusableDrawer";
import Images from "../../gallery/Images";
import { useAppSelector } from "../../../redux/hooks";
import { useGetImageByIdQuery } from "../../../redux/features/gallery/image-api";

const CreateUser = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addSeller, { isLoading }] = useCreateSellerMutation();
  const [addStakeHolder, { isLoading: isCreating }] =
    useCreateStakeHolderMutation();
  const selectedId = useAppSelector((state) => state.selectedId.selectedId);
  const { data: image, isLoading: isComing } = useGetImageByIdQuery(
    selectedId || null
  );
  const [role, setRole] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsSeller(role === "seller");
  }, [role]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let res;
      if (role === "admin") {
        const stakeHolder = {
          password: data?.password,
          stakeholder: {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            phone: data?.phone,
            nid: data?.nid,
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            dateOfJoining: data?.dateOfJoining,
            address: data?.address,
            profileImage: image?.data?.photo,
          },
        };
        res = await addStakeHolder(stakeHolder);
      } else if (role === "seller") {
        const seller = {
          password: data?.password,
          seller: {
            name: data?.name,
            email: data?.email,
            role: data?.role,
            phone: data?.phone,
            nid: data?.nid,
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            dateOfJoining: data?.dateOfJoining,
            address: data?.address,
            bankAccountInfo: data?.bankAccountInfo,
            profileImage: image?.data?.photo,
          },
        };
        res = await addSeller(seller);
      }
      if (res?.data?.success) {
        setRole("");
        showToast({
          message: res.data.message,
          duration: 2000,
          position: {
            horizontal: "right",
            vertical: "top",
          },
          type: "success",
        });
      }
    } catch {
      showToast({
        message: "Something wrong",
        duration: 2000,
        position: {
          horizontal: "right",
          vertical: "top",
        },
        type: "error",
      });
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <ReusableForm onSubmit={onSubmit}>
          <FormHeader
            title="User Registration"
            subTitle="Please fill in authentic details below."
          />

          {/* image */}
          <Box sx={{ mb: 4 }}>
            <SectionHeader
              icon={<FaUser />}
              title="User Photo"
              subtitle="Upload or select a profile image"
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* Preview */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                {isComing ? (
                  <Loader />
                ) : selectedId && image?.data?.photo?.url ? (
                  <img
                    src={image.data.photo.url}
                    alt={image?.data?.photoName || "Selected Image"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "#888",
                      fontSize: "0.875rem",
                    }}
                  >
                    No Image
                  </Box>
                )}
              </Box>

              {/* Image Details */}
              {image?.data?.photoName && (
                <Box sx={{ flexGrow: 1 }}>
                  <Box fontWeight={500}>{image.data.photoName}</Box>
                </Box>
              )}

              {/* Add or Change Button */}
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => setDrawerOpen(true)}
                  sx={{ textTransform: "none" }}
                >
                  {selectedId ? "Change Image" : "Add Image"}
                </Button>
              </Box>
            </Box>

            <ReusableDrawer
              width="50%"
              open={drawerOpen}
              onClose={() => {
                setDrawerOpen(false);
                return true;
              }}
            >
              <Images />
            </ReusableDrawer>
          </Box>

          <SectionHeader
            icon={<GrAction />}
            title="Role Information"
            subtitle="Choose the user role"
          />

          <Box>
            <SelectInputField
              name="role"
              label="Role"
              options={["admin", "seller"]}
              requiredMessage="Select a role"
              onChange={(value) => setRole(value)}
            />
          </Box>

          <SectionHeader
            icon={<FaUser />}
            title="Personal Information"
            subtitle="Enter basic personal details"
          />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.firstName" label="First Name" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.middleName" label="Middle Name" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="name.lastName" label="Last Name" required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="email" label="Email" type="email" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="phone" label="Phone" type="tel" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextInput name="nid" label="NID" required />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfBirth" label="Date of Birth" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DateInput name="dateOfJoining" label="Joining Date" required />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <SelectInputField
                name="gender"
                label="Gender"
                options={["male", "female", "other"]}
                requiredMessage="Gender is required"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <SectionHeader
                icon={<InfoOutlinedIcon />}
                title="Address Information"
                subtitle="Enter present and permanent address"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.presentAddress"
                label="Present Address"
                required
                multiline
                row={2}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextInput
                name="address.permanentAddress"
                label="Permanent Address"
                required
                multiline
                row={2}
              />
            </Grid>

            {isSeller && (
              <>
                <Grid size={{ xs: 12, md: 12 }}>
                  <SectionHeader
                    icon={<MdAccountBalance />}
                    title="Bank Information"
                    subtitle="Only for sellers"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.paymentMethod"
                    label="Payment Method"
                    options={["bankTransfer", "mobileBanking"]}
                    requiredMessage="Payment method is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SelectInputField
                    name="bankAccountInfo.bankName"
                    label="Bank Name"
                    options={["bKash", "Nagad", "dhakaBank"]}
                    requiredMessage="Bank name is required"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextInput
                    name="bankAccountInfo.accountNumber"
                    label="Account Number"
                    required
                  />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, md: 12 }}>
              <SectionHeader
                icon={<MdSecurity />}
                title="Security"
                subtitle="Create new password"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <TextInput
                name="password"
                label="Password"
                type="password"
                defaultValue="12345"
                placeholder="Enter your password"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                {isCreating || isLoading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Create Account"
                )}
              </Button>
            </Grid>
          </Grid>
        </ReusableForm>
      </Paper>
    </Box>
  );
};

export default CreateUser;
