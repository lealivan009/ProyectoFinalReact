import { Container } from "@mui/material";
import AppBar from "./components/AppBar";
import Routes from "./components/Routes";

function App() {
  return (
    <>
      <AppBar />
      <div style={{ height: "80px" }}></div>
      <Container
        sx={{
          backgroundColor: "white",
          minHeight: "300px",
          padding: "3px",
          boxShadow: "5px 5px 20px",
        }}
      >
        <Routes />
      </Container>
    </>
  );
}

export default App;
