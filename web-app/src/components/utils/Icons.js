import { Avatar } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import SpaIcon from "@mui/icons-material/Spa";
import AddIcon from "@mui/icons-material/Add";

export function FoodIcon() {
  return (
    <Avatar sx={{ bgcolor: "#08b681" }} variant="rounded">
      <FastfoodIcon fontSize="large" />
    </Avatar>
  );
}

export function LeisureIcon() {
  return (
    <Avatar sx={{ bgcolor: "#ebbd78" }} variant="rounded">
      <SpaIcon fontSize="large" />
    </Avatar>
  );
}

export function ShoppingIcon() {
  return (
    <Avatar sx={{ bgcolor: "#ff9d9c" }} variant="rounded">
      <ShoppingBagIcon fontSize="large" />
    </Avatar>
  );
}

export function TransportIcon() {
  return (
    <Avatar sx={{ bgcolor: "#a078ff" }} variant="rounded">
      <DirectionsBusFilledIcon fontSize="large" />
    </Avatar>
  );
}

export function AddExpenseIcon() {
  return (
    <Avatar sx={{ bgcolor: "#93c5fe" }} variant="rounded">
      <AddIcon fontSize="large" />
    </Avatar>
  );
}
