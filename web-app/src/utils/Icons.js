import { Avatar } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import SpaIcon from "@mui/icons-material/Spa";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
export function FoodIcon() {
  return (
    <Avatar sx={{ bgcolor: "#08b681", alignself: "center" }} variant="rounded">
      <FastfoodIcon fontSize="large" />
    </Avatar>
  );
}

export function LeisureIcon() {
  return (
    <Avatar sx={{ bgcolor: "#ebbd78", alignself: "center" }} variant="rounded">
      <SpaIcon fontSize="large" />
    </Avatar>
  );
}

export function ShoppingIcon() {
  return (
    <Avatar sx={{ bgcolor: "#ff9d9c", alignself: "center" }} variant="rounded">
      <ShoppingBagIcon fontSize="large" alignself="center" />
    </Avatar>
  );
}

export function TransportIcon() {
  return (
    <Avatar sx={{ bgcolor: "#a078ff", alignself: "center" }} variant="rounded">
      <DirectionsBusFilledIcon fontSize="large" />
    </Avatar>
  );
}

export function AddExpenseIcon() {
  return (
    <Avatar sx={{ bgcolor: "#93c5fe", alignself: "center" }} variant="rounded">
      <AddIcon fontSize="large" />
    </Avatar>
  );
}

export function OthersIcon() {
  return (
    <Avatar sx={{ bgcolor: "#9BA4B5", alignself: "center" }} variant="rounded">
      <CheckBoxOutlineBlankIcon fontSize="large" />
    </Avatar>
  );
}
