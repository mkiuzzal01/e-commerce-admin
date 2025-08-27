import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import type { StatCardProps } from "./TOverview";
import { ChevronDown, ChevronUp } from "lucide-react";

// Custom component for stat cards
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  color,
}) => (
  <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
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
