import { Avatar } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import SpaIcon from "@mui/icons-material/Spa";
import AddIcon from "@mui/icons-material/Add";

export function FoodIcon() {
  return (
    <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
      <FastfoodIcon fontSize="large" />
    </Avatar>
  );
}

export function LeisureIcon() {
  return (
    <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
      <SpaIcon fontSize="large" />
    </Avatar>
  );
}

export function ShoppingIcon() {
  return (
    <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
      <ShoppingBagIcon fontSize="large" />
    </Avatar>
  );
}

export function TransportIcon() {
  return (
    <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
      <DirectionsBusFilledIcon fontSize="large" />
    </Avatar>
  );
}

export function AddExpenseIcon() {
  return (
    <Avatar sx={{ bgcolor: "gray" }} variant="rounded">
      <AddIcon fontSize="large" />
    </Avatar>
  );
}
