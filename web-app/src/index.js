import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/utils/Navbar";
import Home from "./routes/Home";
import Container from "@mui/material/Container";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Expenses from "./routes/Expenses";
import { Stack } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    fontFamily: ["sans-serif"].join(","),
    fontWeight: 510,
    allVariants: {
      color: "#01161e",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container maxWidth="md" sx={{ bgcolor: "#eff6e0", p: 5 }}>
        <Stack spacing={4}>
          <Navbar />
          <Outlet />
        </Stack>
      </Container>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/expenses?",
        element: <Expenses />,
      },
      {
        path: "/trips",
        element: <Home trips={true} />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
