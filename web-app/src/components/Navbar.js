import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>Hello, @tungyuen</Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" component={RouterLink} to="/">Home</Link>
        <Link underline="hover" component={RouterLink} to="/trips">My Trips</Link>
      </Breadcrumbs>
    </Box>
  );
}
