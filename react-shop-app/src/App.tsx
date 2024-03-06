import Navbar from "./Components/Navbar";
import Frontpage from "./Pages/Frontpage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style/index.css";

import { AuthContextProvider } from "./contexts/AuthContext";
import Item from "./Pages/ItemPage";
import ProtectedRoute from "./Components/NestedRoutes/ProtectedRoute";
import RateSection from "./Components/NestedRoutes/RateSection";
import MensClothing from "./Pages/MensClothing";
import WomensClothing from "./Pages/WomensClothing";
import Electronics from "./Pages/Electronics";
import Jewlery from "./Pages/Jewlery";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Error from "./Pages/ErrorPage";
import { SearchProvider } from "./contexts/SearchContext";
import { ModalProvider } from "./contexts/ModalContext";

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
        children: [
          {
            path: "ratings",
            element: (
              <ProtectedRoute>
                <RateSection />
              </ProtectedRoute>
            ),
          },
        ],
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
        path: "/signup",
        element: <SignUp />,
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
      <AuthContextProvider>
        <SearchProvider>
          <ModalProvider>
            <RouterProvider router={router} />
          </ModalProvider>
        </SearchProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
