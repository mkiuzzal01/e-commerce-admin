import { Box, Typography } from "@mui/material";

type FormHeaderProps = {
  title: string;
  subTitle: string;
};
const FormHeader = ({ title, subTitle }: FormHeaderProps) => {
  return (
    <Box className="bg-green-800 p-6">
      <Typography variant="h6" fontWeight="bold" color="white">
        {title}
      </Typography>
      <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default FormHeader;
