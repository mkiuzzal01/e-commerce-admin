import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Badge,
  AccountBalance,
  Payment,
  AccountBalanceWallet,
  Store,
  Verified,
  PersonAdd,
} from "@mui/icons-material";
import { InfoLineCard } from "./InfoLineCard";

interface SellerProps {
  _id: string;
  creator: {
    _id: string;
    email: string;
    role: string;
    status: string;
  };
  userId: {
    _id: string;
    email: string;
    role: string;
    status: string;
  };
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: string;
  gender: string;
  dateOfJoining: string;
  address: {
    presentAddress: string;
    permanentAddress: string;
  };
  profileImage: {
    publicId: string;
    url: string;
  };
  bankAccountInfo: {
    _id: string;
    accountNumber: string;
    bankName: string;
    balance: number;
    paymentMethod?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  creatorProfile: {
    _id: string;
    name: {
      firstName: string;
      middleName?: string;
      lastName: string;
    };
    email: string;
    phone: string;
  };
  isDeleted: boolean;
  slug: string;
  __v: number;
}

const SellerDetails = ({ seller }: { seller: SellerProps }) => {
  if (!seller) return null;

  const bank = seller.bankAccountInfo || {};
  const fullName = `${seller.name.firstName} ${seller.name.middleName ? seller.name.middleName + " " : ""}${seller.name.lastName}`;
  const creatorFullName = `${seller.creatorProfile.name.firstName} ${seller.creatorProfile.name.middleName ? seller.creatorProfile.name.middleName + " " : ""}${seller.creatorProfile.name.lastName}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      case "suspended":
        return "error";
      default:
        return "default";
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    if (!method) return <Payment fontSize="small" />;

    switch (method.toLowerCase()) {
      case "banktransfer":
        return <AccountBalance fontSize="small" />;
      case "card":
        return <Payment fontSize="small" />;
      case "wallet":
        return <AccountBalanceWallet fontSize="small" />;
      default:
        return <Payment fontSize="small" />;
    }
  };

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header Section with Seller-themed Gradient */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 3,
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={seller.profileImage?.url}
              alt={fullName}
              sx={{
                width: 80,
                height: 80,
                border: "3px solid rgba(255,255,255,0.3)",
                boxShadow: 2,
              }}
            />
            <Box flex={1}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                {fullName}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                <Chip
                  label="SELLER"
                  color="warning"
                  size="small"
                  icon={<Store />}
                  sx={{
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "inherit" },
                  }}
                />
                <Chip
                  label={seller?.userId?.status?.toUpperCase()}
                  color={getStatusColor(seller?.userId?.status) as any}
                  size="small"
                  icon={<Verified />}
                  sx={{
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "inherit" },
                  }}
                />
                {bank.status && (
                  <Chip
                    label={`BANK ${bank.status.toUpperCase()}`}
                    color={getStatusColor(bank.status) as any}
                    size="small"
                    icon={<AccountBalance />}
                    sx={{
                      fontWeight: 600,
                      "& .MuiChip-icon": { color: "inherit" },
                    }}
                  />
                )}
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Email fontSize="small" />
                {seller?.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Personal Information Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              <Person />
              Personal Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <InfoLineCard
                label="Phone"
                value={seller?.phone}
                icon={<Phone fontSize="small" />}
              />
              <InfoLineCard
                label="Gender"
                value={
                  seller?.gender?.charAt(0).toUpperCase() +
                  seller?.gender?.slice(1)
                }
              />
              <InfoLineCard
                label="Date of Birth"
                value={formatDate(seller?.dateOfBirth)}
                icon={<CalendarToday fontSize="small" />}
              />
              <InfoLineCard
                label="Date of Joining"
                value={formatDate(seller?.dateOfJoining)}
                icon={<CalendarToday fontSize="small" />}
              />
              <InfoLineCard
                label="National ID"
                value={seller?.nid}
                icon={<Badge fontSize="small" />}
              />
            </Grid>
          </Paper>

          {/* Address Information Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              <LocationOn />
              Address Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <InfoLineCard
                label="Present Address"
                value={seller?.address?.presentAddress}
                icon={<LocationOn fontSize="small" />}
              />
              <InfoLineCard
                label="Permanent Address"
                value={seller?.address?.permanentAddress}
                icon={<LocationOn fontSize="small" />}
              />
            </Grid>
          </Paper>

          {/* Bank Account Information Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              <AccountBalance />
              Bank Account Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <InfoLineCard
                label="Account Number"
                value={bank?.accountNumber}
                icon={<AccountBalance fontSize="small" />}
              />
              <InfoLineCard
                label="Bank Name"
                value={bank?.bankName}
                icon={<AccountBalance fontSize="small" />}
              />
              {bank?.paymentMethod && (
                <InfoLineCard
                  label="Payment Method"
                  value={
                    <Box display="flex" alignItems="center" gap={1}>
                      {getPaymentMethodIcon(bank?.paymentMethod)}
                      {bank.paymentMethod?.replace(/([A-Z])/g, " $1").trim()}
                    </Box>
                  }
                />
              )}
              <InfoLineCard
                label="Current Balance"
                value={
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color:
                        bank.balance > 0 ? "success.main" : "text.secondary",
                      fontSize: "1.1rem",
                    }}
                  >
                    {formatCurrency(bank?.balance ?? 0)}
                  </Typography>
                }
                icon={<AccountBalanceWallet fontSize="small" />}
              />
              {bank?.status && (
                <InfoLineCard
                  label="Account Status"
                  value={
                    <Chip
                      label={bank?.status?.toUpperCase()}
                      color={getStatusColor(bank?.status) as any}
                      size="small"
                      variant="outlined"
                    />
                  }
                />
              )}
              {bank?.createdAt && (
                <InfoLineCard
                  label="Account Created"
                  value={formatDate(bank?.createdAt)}
                  icon={<CalendarToday fontSize="small" />}
                />
              )}
            </Grid>
          </Paper>

          {/* Creator Information Section */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              <PersonAdd />
              Creator Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <InfoLineCard
                label="Creator Name"
                value={creatorFullName}
                icon={<Person fontSize="small" />}
              />
              <InfoLineCard
                label="Creator Email"
                value={seller?.creatorProfile?.email}
                icon={<Email fontSize="small" />}
              />
              <InfoLineCard
                label="Creator Phone"
                value={seller?.creatorProfile?.phone}
                icon={<Phone fontSize="small" />}
              />
              <InfoLineCard
                label="Creator Role"
                value={
                  <Chip
                    label={seller?.creator?.role?.toUpperCase()}
                    color="info"
                    size="small"
                    variant="outlined"
                  />
                }
              />
              <InfoLineCard
                label="Creator Status"
                value={
                  <Chip
                    label={seller?.creator?.status?.toUpperCase()}
                    color={getStatusColor(seller?.creator?.status) as any}
                    size="small"
                    variant="outlined"
                  />
                }
              />
            </Grid>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SellerDetails;
