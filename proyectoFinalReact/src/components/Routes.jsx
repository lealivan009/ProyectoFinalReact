import { Navigate, useRoutes } from "react-router-dom";
import AllProducts from "./AllProducts";
import DetailsProduct from "./DetailsProduct";
import Carts from "./Carts";

function Routes() {
  let element = useRoutes([
    {
      path: "/",
      element: <AllProducts />,
    },
    {
      path: "/detailsproduct/:id",
      element: <DetailsProduct />,
    },
    {
      path: "/carts",
      element: <Carts />,
    },
    { path: "*", element: <Navigate to={"/"} /> },
  ]);

  return element;
}
export default Routes;
