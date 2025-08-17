/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import Loader from "../../../shared/Loader";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Container,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Badge as BadgeIcon,
  Male,
  Female,
  Wc,
  AdminPanelSettings,
  PersonOutline,
} from "@mui/icons-material";
import { useSingleUserBySlugQuery } from "../../../redux/features/user/user-api";

export default function ViewUser() {
  const { slug } = useParams();
  const { data, isLoading } = useSingleUserBySlugQuery(slug ? slug : "");

  if (isLoading) return <Loader />;

  if (!data || !data.success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            User Not Found
          </Typography>
          <Typography>The requested user could not be found.</Typography>
        </Alert>
      </Container>
    );
  }

  const user = data?.data;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "in-progress":
        return "warning";
      case "inactive":
        return "error";
      case "pending":
        return "info";
      default:
        return "default";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "error";
      case "moderator":
        return "warning";
      case "user":
        return "primary";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return <AdminPanelSettings />;
      case "moderator":
        return <BadgeIcon />;
      case "user":
        return <PersonOutline />;
      default:
        return <Person />;
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender?.toLowerCase()) {
      case "male":
        return <Male color="primary" />;
      case "female":
        return <Female color="secondary" />;
      default:
        return <Wc color="action" />;
    }
  };

  const getInitials = (name: any) => {
    const first = name.firstName?.charAt(0) || "";
    const middle = name.middleName ? name.middleName.charAt(0) : "";
    const last = name.lastName?.charAt(0) || "";
    return `${first}${middle}${last}`.toUpperCase();
  };

  const getAvatarColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "error.main";
      case "moderator":
        return "warning.main";
      case "user":
        return "primary.main";
      default:
        return "grey.500";
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    sx={{
                      width: 22,
                      height: 22,
                      bgcolor: getAvatarColor(user?.role),
                      border: "2px solid white",
                    }}
                  >
                    {getRoleIcon(user?.role)}
                  </Avatar>
                }
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: getAvatarColor(user?.role),
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {getInitials(user?.name)}
                </Avatar>
              </Badge>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {user?.name?.firstName}{" "}
                    {user?.name?.middleName && user?.name?.middleName + " "}
                    {user?.name?.lastName}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    <Chip
                      label={
                        user?.status?.charAt(0)?.toUpperCase() +
                        user?.status?.slice(1)
                      }
                      color={getStatusColor(user?.status)}
                      variant="filled"
                      size="small"
                    />
                    <Chip
                      icon={getRoleIcon(user.role)}
                      label={
                        user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)
                      }
                      color={getRoleColor(user.role)}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      icon={getGenderIcon(user.gender)}
                      label={
                        user?.gender?.charAt(0)?.toUpperCase() +
                        user?.gender?.slice(1)
                      }
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Personal Information */}
          <Paper elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Person color="primary" />
                <Typography variant="h6" component="h2">
                  Personal Information
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <List dense>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Person fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Full Name"
                        secondary={`${user?.name?.firstName} ${user?.name?.middleName && user?.name?.middleName + " "}${user?.name?.lastName}`}
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Email fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email Address"
                        secondary={user?.email}
                      />
                    </ListItem>

                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Phone fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone Number"
                        secondary={user?.phone}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <CardContent>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          fontWeight="medium"
                          gutterBottom
                          color="primary"
                        >
                          Permanent Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.address?.permanentAddress}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          fontWeight="medium"
                          gutterBottom
                          color="primary"
                        >
                          Present Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.address?.presentAddress}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
