import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns"; // Importar la función de formateo de fecha

export default function Carts() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/users")
        .then((response) => response.json())
        .then((json) => {
          return json;
        }),
  });

  const cartsQuery = useQuery(
    ["carts", selectedUser],
    () =>
      fetch(`https://fakestoreapi.com/carts/user/${selectedUser}`).then(
        (response) => response.json()
      ),
    {
      enabled: !!selectedUser,
    }
  );

  return (
    <div style={{ padding: "30px" }}>
      <Typography variant="h3" align="center" sx={{ padding: "10px" }}>
        Carts
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select value={selectedUser} onChange={handleUserChange} displayEmpty>
            <MenuItem value={null} disabled>
              Select a user
            </MenuItem>
            {usersQuery.data?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div>
        {selectedUser && (
          <Box sx={{ flexGrow: 1 }}>
            {cartsQuery.isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </div>
            ) : cartsQuery.isError ? (
              <div>Error loading carts.</div>
            ) : cartsQuery.data?.length === 0 ? (
              <div>No carts available for this user.</div>
            ) : (
              <div>
                {cartsQuery.data.map((cart) => (
                  <div
                    key={cart.id}
                    style={{
                      marginBottom: "20px",
                      background: "#f5f5f5",
                      padding: "15px",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h5" style={{ marginRight: "auto" }}>
                        {format(new Date(cart.date), "dd-MM-yyyy")}{" "}
                        {/* Formatear la fecha */}
                      </Typography>
                      <Typography variant="h6" style={{ textAlign: "right" }}>
                        Total:{" "}
                        {cart.products.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )}
                      </Typography>
                    </div>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.products.map((product) => (
                          <tr key={product.productId}>
                            <td style={{ textAlign: "center" }}>
                              {product.productId}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {product.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </Box>
        )}
      </div>
    </div>
  );
}
