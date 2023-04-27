import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function Greeting({ telegramId }) {
  return (
    <Stack>
      <Typography>Hello, </Typography>
      <Typography variant="h5" fontWeight={"bold"} color={"#2f94fe"}>
        @{telegramId}
      </Typography>
    </Stack>
  );
}

function Navigation({ telegramId }) {
  return (
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
  );
}
export default function Navbar() {
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  return (
    <Grid container justifyContent="space-between">
      <Grid Greeting sm={8}>
        <Greeting telegramId={telegramId} />
      </Grid>
      <Grid Navigation sm={2}>
        <Navigation telegramId={telegramId} />
      </Grid>
    </Grid>
  );
}
