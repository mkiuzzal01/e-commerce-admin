/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useSingleOrderQuery } from "../../../redux/features/order/order.Api";
import Loader from "../../../shared/Loader";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  Container,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  ShoppingCart,
  CalendarToday,
  Update,
} from "@mui/icons-material";

export default function ViewOrder() {
  const { slug } = useParams();
  const { data, isLoading, } = useSingleOrderQuery(slug ? slug : "");

  if (isLoading) return <Loader />

  if (!data || !data.success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="warning">
          <Typography variant="h6" gutterBottom>
            Order Not Found
          </Typography>
          <Typography>The requested order could not be found.</Typography>
        </Alert>
      </Container>
    );
  }

  const order = data.data;
  const customer = order.customerId;
  const orderItem = order.orderItems[0];
  const product = orderItem.productId;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "CONFIRMED":
        return "info";
      case "SHIPPED":
        return "primary";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  const subtotal = order.orderItems.reduce(
    (total: number, item: any) => total + item.productId.price * item.quantity,
    0
  );
  const discount = subtotal - order.totalPrice;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="h1" gutterBottom>
                Order Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order ID: {order._id}
              </Typography>
            </Box>
            <Chip
              label={order.orderStatus}
              color={getStatusColor(order.orderStatus)}
              variant="filled"
              size="medium"
            />
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarToday fontSize="small" color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Order Date
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(order.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Update fontSize="small" color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(order.updatedAt)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Customer Information */}
          <Paper elevation={2} sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <Person color="primary" />
                <Typography variant="h6" component="h2">
                  Customer Information
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                    >
                      {customer.name.firstName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {customer.name.firstName}{" "}
                        {customer.name.middleName &&
                          customer.name.middleName + " "}
                        {customer.name.lastName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Phone fontSize="small" color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {customer.phone}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Delivery Address */}
          <Paper elevation={2} sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <LocationOn color="primary" />
                <Typography variant="h6" component="h2">
                  Delivery Address
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Present Address
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {order.deliveryAddress.presentAddress}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Permanent Address
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {order.deliveryAddress.permanentAddress}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Order Items */}
          <Paper elevation={2}>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
              >
                <ShoppingCart color="primary" />
                <Typography variant="h6" component="h2">
                  Order Items
                </Typography>
              </Box>

              {order.orderItems.map((item: any, index: number) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{ mb: index < order.orderItems.length - 1 ? 2 : 0 }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 2 }}>
                        <CardMedia
                          component="img"
                          height="80"
                          image={
                            item?.productId?.productImage?.photo?.url ||
                            "https://via.placeholder.com/80x80?text=No+Image"
                          }
                          alt={item.productId.title}
                          sx={{
                            borderRadius: 1,
                            objectFit: "cover",
                            width: 80,
                            height: 80,
                          }}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, md: 7 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {item.productId.title}
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                          <Chip
                            label={`Color: ${item.color}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`Size: ${item.size.toUpperCase()}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`Qty: ${item.quantity}`}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 3 }} textAlign="right">
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          ${item.productId.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={2} sx={{ position: "sticky", top: 24 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Order Summary
              </Typography>

              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "none", pl: 0 }}
                      >
                        <Typography variant="body1">Subtotal</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ border: "none", pr: 0 }}>
                        <Typography variant="body1" fontWeight="medium">
                          ${subtotal}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "none", pl: 0 }}
                      >
                        <Typography variant="body1">Discount</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ border: "none", pr: 0 }}>
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          color="success.main"
                        >
                          -${discount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  ${order.totalPrice}
                </Typography>
              </Box>

              {/* Product Variants Info */}
              {product.variants && product.variants.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
                    Available Variants
                  </Typography>
                  <List dense>
                    {product.variants.map((variant: any, index: number) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ textTransform: "capitalize" }}
                              >
                                {variant.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {variant.attributes?.length || 0} attributes
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
