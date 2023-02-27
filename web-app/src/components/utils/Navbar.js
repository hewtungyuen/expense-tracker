import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const name = 'Tung Yuen'

export default function Navbar() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack>
        <Typography>Hello, </Typography>
        <Typography variant="h5" fontWeight={'bold'}>{name}</Typography>
      </Stack>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color={'black'} underline="" component={RouterLink} to="/">
          Home
        </Link>
        <Link color={'black'} underline="" component={RouterLink} to="/trips">
          My Trips
        </Link>
      </Breadcrumbs>
    </Box>
  );
}
