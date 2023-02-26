import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Container from "@mui/material/Container";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Expenses from "./routes/Expenses";
import { Stack } from "@mui/material";
import Trips from "./routes/Trips";

import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
    fontWeight: 510,
  },});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Container maxWidth="sm" sx={{ bgcolor: "#cdc6c3", height: "100vh", paddingTop:5}}>
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
        path: "/expenses",
        element: <Expenses />,
      },
      {
        path: "/trips",
        element: <Trips />,
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
