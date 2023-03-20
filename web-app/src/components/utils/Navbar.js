import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Navbar() {
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack>
        <Typography>Hello, </Typography>
        <Typography variant="h5" fontWeight={"bold"}>
          @{telegramId}
        </Typography>
      </Stack>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color={"black"}
          underline="hover"
          component={RouterLink}
          to={`/${telegramId}`}
        >
          Home
        </Link>
        <Link
          color={"black"}
          underline="hover"
          component={RouterLink}
          to={`/${telegramId}/trips`}
        >
          My Trips
        </Link>
      </Breadcrumbs>
    </Box>
  );
}
