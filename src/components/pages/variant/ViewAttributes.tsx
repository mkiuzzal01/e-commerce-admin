import { useParams } from "react-router-dom";
import { useSingleVariantQuery } from "../../../redux/features/variant/variant-api";
import Loader from "../../../shared/Loader";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  Label as LabelIcon,
} from "@mui/icons-material";

export default function ViewAttributes() {
  const { slug } = useParams();
  const { data, isLoading } = useSingleVariantQuery(slug ?? "");

  if (isLoading) return <Loader />;

  const variant = data?.data;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LabelIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Basic Information</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 3,
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Name
                    </Typography>
                    <Chip
                      label={variant?.name || "N/A"}
                      color="primary"
                      variant="outlined"
                      sx={{ textTransform: "capitalize" }}
                    />
                  </Box>
                </Stack>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Created At
                    </Typography>
                    <Typography variant="body2">
                      {variant?.createdAt
                        ? new Date(variant?.createdAt).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Updated At
                    </Typography>
                    <Typography variant="body2">
                      {variant?.updatedAt
                        ? new Date(variant?.updatedAt).toLocaleString()
                        : "N/A"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
        >
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Attributes</Typography>
                <Chip
                  label={`${variant?.attributes?.length || 0} items`}
                  size="small"
                  color="primary"
                  sx={{ ml: 2 }}
                />
              </Box>

              {variant?.attributes && variant.attributes.length > 0 ? (
                <List sx={{ width: "100%" }}>
                  {variant.attributes.map((attribute: any, index: number) => (
                    <Box key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              bgcolor: `${attribute?.value}`,
                            }}
                          >
                            {index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight={500}>
                              {attribute?.value}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < variant?.attributes?.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No attributes found for this variant.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
