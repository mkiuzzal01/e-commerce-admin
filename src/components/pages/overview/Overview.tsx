import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Users,
  ShoppingCart,
  DollarSign,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Activity,
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
} from "recharts";

// Sample data
const salesData = [
  { name: "Jan", value: 4000, orders: 240 },
  { name: "Feb", value: 3000, orders: 198 },
  { name: "Mar", value: 5000, orders: 300 },
  { name: "Apr", value: 4500, orders: 278 },
  { name: "May", value: 6000, orders: 350 },
  { name: "Jun", value: 5500, orders: 325 },
];

const pieData = [
  { name: "Desktop", value: 45, color: "#8884d8" },
  { name: "Mobile", value: 35, color: "#82ca9d" },
  { name: "Tablet", value: 20, color: "#ffc658" },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, trend, icon, color }) => (
  <Card elevation={2} sx={{ height: "100%" }}>
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="h2" fontWeight="bold">
            {value}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            {trend === "up" ? (
              <ChevronUp
                width={16}
                height={16}
                color="#2e7d32"
                style={{ marginRight: 4 }}
              />
            ) : (
              <ChevronDown
                width={16}
                height={16}
                color="#d32f2f"
                style={{ marginRight: 4 }}
              />
            )}
            <Typography
              variant="body2"
              color={trend === "up" ? "success.main" : "error.main"}
              fontWeight="medium"
            >
              {change}
            </Typography>
            <Typography variant="body2" color="textSecondary" ml={1}>
              vs last month
            </Typography>
          </Box>
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

const Overview: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$45,231"
            change="+12.5%"
            trend="up"
            icon={<DollarSign />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Orders"
            value="1,235"
            change="+8.2%"
            trend="up"
            icon={<ShoppingCart />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Users"
            value="2,847"
            change="-2.4%"
            trend="down"
            icon={<Users />}
            color="info.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            change="+0.8%"
            trend="up"
            icon={<Activity />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        {/* Sales Trend */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Sales Overview
              </Typography>
              <IconButton>
                <MoreHorizontal />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Traffic Sources */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper elevation={2} sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Traffic Sources
            </Typography>
            <Box height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box mt={2}>
              {pieData.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      width={12}
                      height={12}
                      bgcolor={item.color}
                      borderRadius="50%"
                      mr={1}
                    />
                    <Typography variant="body2">{item.name}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Recent Activities
              </Typography>
              <Chip label="Live" color="success" size="small" />
            </Box>
            {/* <List>
              {recentActivities.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={activity.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="medium">
                          {activity.user}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {activity.action}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {activity.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </Box>
              ))}
            </List> */}
          </Paper>
        </Grid>

        {/* Performance Metrics */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Performance Metrics
            </Typography>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Server Response Time</Typography>
                <Typography variant="body2" fontWeight="bold">
                  85%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Database Performance</Typography>
                <Typography variant="body2" fontWeight="bold">
                  72%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={72}
                sx={{ height: 8, borderRadius: 4 }}
                color="warning"
              />
            </Box>
            <Box mb={3}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">User Satisfaction</Typography>
                <Typography variant="body2" fontWeight="bold">
                  94%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={94}
                sx={{ height: 8, borderRadius: 4 }}
                color="success"
              />
            </Box>
            <Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">System Uptime</Typography>
                <Typography variant="body2" fontWeight="bold">
                  99%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={99}
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

export default Overview;
