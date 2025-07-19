import { Box, Grid, Typography } from "@mui/material";

export const InfoLineCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <Grid size={{ xs: 12, md: 6 }}>
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {icon && (
        <Box
          sx={{ color: "primary.main", display: "flex", alignItems: "center" }}
        >
          {icon}
        </Box>
      )}
      <Typography
        sx={{ fontWeight: 600, color: "text.primary" }}
        component="span"
      >
        {label}:
      </Typography>
    </Box>
    <Typography
      component="div"
      sx={{
        pl: icon ? 3 : 0,
        color: "text.secondary",
        wordBreak: "break-word",
      }}
    >
      {value ?? "-"}
    </Typography>
  </Grid>
);
