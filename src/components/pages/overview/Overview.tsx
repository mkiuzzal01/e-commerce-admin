/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Users,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
  Package,
  Star,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { useOrderStatsQuery } from "../../../redux/features/order/order.Api";
import { useProductByStatsQuery } from "../../../redux/features/product/product.api";
import { useUserStatsQuery } from "../../../redux/features/user/user-api";
import Loader from "../../../shared/Loader";
import type {
  OrderStatus,
  RecentUser,
  SalesOverTime,
  TopProduct,
  UserGrowth,
} from "./components/TOverview";
import { StatCard } from "./components/StatCard";

const DashboardOverview: React.FC = () => {
  // API calls
  const { data: orderData, isLoading: orderLoading } = useOrderStatsQuery({});
  const { data: productData, isLoading: productLoading } =
    useProductByStatsQuery({});
  const { data: userData, isLoading: userLoading } = useUserStatsQuery({});

  // Show loader if any data is still loading
  if (orderLoading || productLoading || userLoading) return <Loader />;

  // Extract values from API responses with proper fallbacks
  const totalRevenue = orderData?.data?.totalRevenue?.[0]?.total || 0;
  const totalOrders = orderData?.data?.totalOrders?.[0]?.count || 0;
  const totalUsers = userData?.data?.totalUsers?.[0]?.count || 0;
  const totalProducts = productData?.data?.totalProducts?.[0]?.count || 0;

  // Order status counts
  const deliveredOrders =
    orderData?.data?.ordersByStatus?.find(
      (status: OrderStatus) => status._id === "DELIVERED"
    )?.count || 0;

  // Product stats
  const inStockProducts =
    productData?.data?.productsByStatus?.find(
      (status: OrderStatus) => status._id === "in-stock"
    )?.count || 0;

  const avgRating = productData?.data?.averageRatings?.[0]?.avgRating || 0;
  const totalReviews =
    productData?.data?.averageRatings?.[0]?.totalReviews || 0;

  // User stats
  const adminUsers =
    userData?.data?.usersByRole?.find(
      (role: OrderStatus) => role._id === "super-admin"
    )?.count || 0;

  const regularUsers =
    userData?.data?.usersByRole?.find(
      (role: OrderStatus) => role._id === "user"
    )?.count || 0;

  // Format revenue as currency
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(totalRevenue);

  // Calculate order delivery rate
  const deliveryRate =
    totalOrders > 0 ? ((deliveredOrders / totalOrders) * 100).toFixed(1) : "0";

  // Prepare sales data for the chart (last 7 days)
  const salesData =
    orderData?.data?.salesOverTime
      ?.map((item: SalesOverTime) => ({
        name: `${item._id.month}/${item._id.day}`,
        sales: item.total,
        orders: item.count,
      }))
      .slice(-7) || [];

  // Prepare order status data for pie chart
  const orderStatusData =
    orderData?.data?.ordersByStatus?.map((status: OrderStatus) => {
      const statusColors: Record<string, string> = {
        DELIVERED: "#82ca9d",
        PENDING: "#ffc658",
        PROCESSING: "#0088FE",
        CANCELLED: "#ff8042",
        RETURNED: "#ffbb28",
        DISPATCHED: "#8884d8",
        READY_FOR_PICKUP: "#00C49F",
      };

      return {
        name: status._id,
        value: status.count,
        color: statusColors[status._id] || "#8884d8",
      };
    }) || [];

  // Prepare user growth data
  const userGrowthData =
    userData?.data?.userGrowth?.map((item: UserGrowth) => ({
      name: `${item._id.month}/${item._id.year}`,
      users: item.count,
    })) || [];

  // Prepare product status data
  const productStatusData = [
    { name: "In Stock", value: inStockProducts, color: "#82ca9d" },
    {
      name: "Out of Stock",
      value: totalProducts - inStockProducts,
      color: "#ff8042",
    },
  ];

  // Prepare top products data
  const topProductsData =
    orderData?.data?.topProducts?.map((product: TopProduct, index: number) => ({
      name: `Product ${index + 1}`,
      sales: product.totalSold,
    })) || [];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value={formattedRevenue}
            change="+12.5%"
            trend="up"
            icon={<DollarSign />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value={totalOrders.toString()}
            change="+8.2%"
            trend="up"
            icon={<ShoppingCart />}
            color="#2e7d32"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value={totalUsers.toString()}
            change="+5.3%"
            trend="up"
            icon={<Users />}
            color="#0288d1"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Products"
            value={totalProducts.toString()}
            change="+2.1%"
            trend="up"
            icon={<Package />}
            color="#ed6c02"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Sales Trend */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={2} sx={{ p: 3, height: 400, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Sales & Orders Overview (Last 7 Days)
              </Typography>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="sales"
                  name="Sales ($)"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  name="Orders"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Order Status Distribution */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={2} sx={{ p: 3, height: 400, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Order Status Distribution
              </Typography>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </Box>
            <Box height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {orderStatusData.map(
                      (entry: { color: string | undefined }, index: any) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value} orders`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Middle Section */}
      <Grid container spacing={3} mb={4}>
        {/* User Growth */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3, height: 300, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Product Status */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3, height: 300, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Product Status
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={productStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {productStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} products`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Selling Products */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3, height: 300, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Top Selling Products
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="sales" name="Units Sold" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Recent Users */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Recent Users
              </Typography>
              <Chip label="Live" color="success" size="small" />
            </Box>
            <List>
              {userData?.recentUsers
                ?.slice(0, 5)
                .map((user: RecentUser, index: number) => (
                  <Box key={user._id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#1976d2" }}>
                          {user.name?.firstName?.[0]}
                          {user.name?.lastName?.[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight="medium">
                            {user.name?.firstName} {user.name?.lastName}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {user.email}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Joined:{" "}
                              {new Date(user.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <Chip
                        label={user.role}
                        size="small"
                        color={
                          user.role === "super-admin" ? "error" : "default"
                        }
                      />
                    </ListItem>
                    {index < (userData?.recentUsers?.length || 0) - 1 && (
                      <Divider />
                    )}
                  </Box>
                ))}
            </List>
          </Paper>
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Performance Metrics
            </Typography>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Order Delivery Rate</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {deliveryRate}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={parseFloat(deliveryRate)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Average Product Rating</Typography>
                <Box display="flex" alignItems="center">
                  <Star size={16} color="#ffc107" fill="#ffc107" />
                  <Typography variant="body2" fontWeight="bold" ml={0.5}>
                    {avgRating.toFixed(1)}/5 ({totalReviews} reviews)
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={avgRating * 20}
                sx={{ height: 8, borderRadius: 4 }}
                color="warning"
              />
            </Box>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">User Distribution</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {regularUsers} users, {adminUsers} admins
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={totalUsers > 0 ? (adminUsers / totalUsers) * 100 : 0}
                sx={{ height: 8, borderRadius: 4 }}
                color="info"
              />
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Inventory Health</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {inStockProducts}/{totalProducts} in stock
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={
                  totalProducts > 0
                    ? (inStockProducts / totalProducts) * 100
                    : 0
                }
                sx={{ height: 8, borderRadius: 4 }}
                color="success"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardOverview;
