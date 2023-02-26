import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function ExpenseCard({ description, totalAmount }) {
  return (
    <Card>
      <CardActionArea component={RouterLink} to="/expenses">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{description}</Typography>
            <Typography>${totalAmount}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
