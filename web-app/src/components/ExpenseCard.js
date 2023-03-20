import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ExpenseCard({ description, totalAmount, overseas }) {
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  let link;
  if (overseas) {
    link = `/${telegramId}/expenses?overseas=true&tripName=${description}`;
  } else {
    const year = description.split("/")[1].trim();
    const month = description.split("/")[0].trim();
    link = `/${telegramId}/expenses?overseas=false&year=${year}&month=${month}`;
  }
  return (
    <Card>
      <CardActionArea component={RouterLink} to={link}>
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
