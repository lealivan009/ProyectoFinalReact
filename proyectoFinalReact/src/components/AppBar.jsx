import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Button color="inherit" href="/">
            Products
          </Button>
          <Button color="inherit" href="/carts">
            Carts
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
