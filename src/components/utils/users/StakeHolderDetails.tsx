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
  AdminPanelSettings,
} from "@mui/icons-material";
import { InfoLineCard } from "./InfoLineCard";

interface StakeHolderProps {
  _id: string;
  creatorId: string;
  userId: {
    _id: string;
    email: string;
    role: string;
    status: string;
    isPasswordChanged: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    slug: string;
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
  fullName: string;
  slug: string;
  isDeleted: boolean;
}

const StakeHolderDetails = ({
  stakeHolder,
}: {
  stakeHolder: StakeHolderProps;
}) => {
  if (!stakeHolder) return null;

  const fullName = [
    stakeHolder?.name?.firstName,
    stakeHolder?.name?.middleName,
    stakeHolder?.name?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "error";
      case "user":
        return "primary";
      case "moderator":
        return "warning";
      default:
        return "default";
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
        {/* Header Section with Gradient Background */}
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
              src={stakeHolder?.profileImage?.url}
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
                  label={stakeHolder?.userId?.role?.toUpperCase()}
                  color={getRoleColor(stakeHolder?.userId?.role) as any}
                  size="small"
                  icon={<AdminPanelSettings />}
                  sx={{
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "inherit" },
                  }}
                />
                <Chip
                  label={stakeHolder?.userId?.status?.toUpperCase()}
                  color={getStatusColor(stakeHolder?.userId?.status) as any}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
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
                {stakeHolder.email}
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
                value={stakeHolder?.phone}
                icon={<Phone fontSize="small" />}
              />
              <InfoLineCard
                label="Gender"
                value={
                  stakeHolder?.gender?.charAt(0).toUpperCase() +
                  stakeHolder?.gender?.slice(1)
                }
              />
              <InfoLineCard
                label="Date of Birth"
                value={formatDate(stakeHolder?.dateOfBirth)}
                icon={<CalendarToday fontSize="small" />}
              />
              <InfoLineCard
                label="Date of Joining"
                value={formatDate(stakeHolder?.dateOfJoining)}
                icon={<CalendarToday fontSize="small" />}
              />
              <InfoLineCard
                label="National ID"
                value={stakeHolder?.nid}
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
                value={stakeHolder?.address?.presentAddress}
                icon={<LocationOn fontSize="small" />}
              />
              <InfoLineCard
                label="Permanent Address"
                value={stakeHolder?.address?.permanentAddress}
                icon={<LocationOn fontSize="small" />}
              />
            </Grid>
          </Paper>

          {/* Account Information Section */}
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
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
              <AdminPanelSettings />
              Account Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <InfoLineCard
                label="Account Created"
                value={formatDate(stakeHolder?.userId?.createdAt)}
              />
              <InfoLineCard
                label="Last Updated"
                value={formatDate(stakeHolder?.userId?.updatedAt)}
              />
              <InfoLineCard
                label="Password Changed"
                value={
                  <Chip
                    label={
                      stakeHolder?.userId?.isPasswordChanged ? "Yes" : "No"
                    }
                    color={
                      stakeHolder?.userId?.isPasswordChanged
                        ? "success"
                        : "warning"
                    }
                    size="small"
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

export default StakeHolderDetails;
