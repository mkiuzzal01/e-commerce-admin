import { useParams } from "react-router-dom";
import { useSingleMainCategoryQuery } from "../../../redux/features/category/category-api";
import Loader from "../../../shared/Loader";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper,
  Divider,
} from "@mui/material";

export default function ViewCategories() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useSingleMainCategoryQuery(slug ?? "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Handle loader
  if (isLoading) return <Loader />;

  console.log(data?.data);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {data?.data?.name}
            </Typography>
            <Chip
              label={data?.data?.isActive ? "Active" : "Inactive"}
              color={data?.data?.isActive ? "success" : "error"}
              variant="filled"
              sx={{ fontWeight: "medium" }}
            />
          </Box>

          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Created:</strong> {formatDate(data?.data?.createdAt)}
              </Typography>
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Updated:</strong> {formatDate(data?.data?.updatedAt)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Categories Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Categories ({data?.data?.category?.length || 0})
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {data?.data?.category && data?.data?.category.length > 0 ? (
            <Grid container spacing={3}>
              {data?.data?.category.map((cat: any) => (
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4,
                  }}
                  key={cat._id}
                >
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        elevation: 4,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "semibold",
                        }}
                      >
                        {cat.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Created:</strong> {formatDate(cat.createdAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontStyle: "italic", textAlign: "center", py: 4 }}
            >
              No categories found.
            </Typography>
          )}
        </Paper>

        {/* Sub Categories Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Sub Categories ({data?.data?.subCategory?.length || 0})
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {data?.data?.subCategory && data?.data?.subCategory.length > 0 ? (
            <Grid container spacing={3}>
              {data?.data?.subCategory.map((subCat: any) => (
                <Grid
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4,
                  }}
                  key={subCat._id}
                >
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        elevation: 4,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: "semibold",
                        }}
                      >
                        {subCat.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Created:</strong> {formatDate(subCat.createdAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontStyle: "italic", textAlign: "center", py: 4 }}
            >
              No sub categories found.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
