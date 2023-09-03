import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const query = useQuery({
    queryKey: ["productos"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((json) => {
          return json;
        }),
  });

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h3" align="center" sx={{ padding: "10px" }}>
        Products
      </Typography>
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        sx={{ padding: "10px" }}
      >
        Here you can search all products that you need
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {query.data?.map((p) => (
            <Grid key={p.id} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: "5px 5px 20px",
                }}
              >
                <CardMedia
                  component="img"
                  alt={p.title}
                  image={p.image}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    objectFit: "contain", // Ajustar la imagen sin cortar
                    padding: "10px",
                  }}
                />

                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                      height: 60,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    align="center"
                    color="text.secondary"
                  >
                    U$D {p.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "center", marginTop: "auto" }}
                >
                  <Link
                    to={`/detailsproduct/${p.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" size="small">
                      Más detalles
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
