import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useQuery } from "@tanstack/react-query";

import CircularProgress from "@mui/material/CircularProgress";

export default function DetailsProduct() {
  let { id } = useParams();

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery(
    ["producto", id], // Usamos el id como parte de la clave de la consulta
    () =>
      fetch("https://fakestoreapi.com/products/" + id)
        .then((response) => response.json())
        .then((json) => {
          return json;
        }),
    {
      // Opciones de cache
      staleTime: 20000,
    }
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (isError || !product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div style={{ padding: "30px", margin: "20px" }}>
      <Grid container spacing={4}>
        <Grid xs={4}>
          <img
            src={product.image}
            style={{ width: "100%", height: "auto" }}
            alt={product.title}
          />
        </Grid>
        <Grid xs={8}>
          <Typography
            variant="h2"
            align="center"
            fontWeight="bold"
            sx={{ padding: "10px" }}
          >
            {product.title}
          </Typography>
          <Typography variant="h5" align="right" sx={{ padding: "10px" }}>
            {product.category}
          </Typography>
          <p style={{ textAlign: "right", fontSize: "20px" }}>
            {product.description}
          </p>
          <Typography variant="h3" align="right" sx={{ padding: "10px" }}>
            U$D {product.price}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
