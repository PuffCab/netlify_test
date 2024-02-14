import Navbar from "./Components/Navbar";
import Frontpage from "./Pages/Frontpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";
import MensClothing from "./Pages/MensClothing";
import WomensClothing from "./Pages/WomensClothing";
import Electronics from "./Pages/Electronics";
import Error from "./Pages/ErrorPage";
import Jewlery from "./Pages/Jewlery";
import Item from "./Pages/ItemPage";
import Signin from "./Pages/Signin";
import { AuthProvider } from "./contexts/AuthContext";
import Logout from "./Pages/Logout";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Frontpage />,
      },
      {
        path: "/:id",
        element: <Item />,
      },
      {
        path: "/mensclothing",
        element: <MensClothing />,
      },
      {
        path: "/womensclothing",
        element: <WomensClothing />,
      },
      {
        path: "/electronics",
        element: <Electronics />,
      },
      {
        path: "/jewlery",
        element: <Jewlery />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
