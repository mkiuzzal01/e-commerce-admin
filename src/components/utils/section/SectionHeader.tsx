import { Box, Typography } from "@mui/material";

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

const SectionHeader = ({ icon, title, subtitle }: SectionHeaderProps) => (
  <Box className="flex items-center gap-3 my-2 p-2 border-green-700 border-1 border-dashed">
    <Box>{icon}</Box>
    <Box>
      <Typography variant="h6" fontWeight="bold" color="success">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="info">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
);

export default SectionHeader;
