import { Box, Button, Typography } from "@mui/material";

type Props = {
  refetch?: () => void;
  heading?: string;
  subHeading?: string;
};
export default function Empty({ refetch, heading, subHeading }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color="textSecondary" align="center">
        {heading}
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        {subHeading}
      </Typography>
      <Box>
        <Button variant="outlined" onClick={() => refetch && refetch()}>
          refresh
        </Button>
      </Box>
    </Box>
  );
}
