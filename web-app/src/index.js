import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/utils/Navbar";
import Home from "./routes/Home";
import Container from "@mui/material/Container";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Expenses from "./routes/Expenses";
import { Stack } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./routes/Login";
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
      <Container
        maxWidth={false}
        sx={{ bgcolor: "#eff6e0", p: 5, minHeight: "100vh"}}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Container>
    ),
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/:telegramId",
        element: (
          <Stack spacing={4}>
            <Navbar />
            <Outlet />
          </Stack>
        ),
        children: [
          {
            path: "/:telegramId",
            element: <Home />,
          },
          {
            path: "/:telegramId/expenses?",
            element: <Expenses />,
          },
          {
            path: "/:telegramId/trips",
            element: <Home trips={true} />,
          },
        ],
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
