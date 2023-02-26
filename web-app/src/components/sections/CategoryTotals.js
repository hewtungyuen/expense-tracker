import CategoryTotal from "../CategoryTotal";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SpaIcon from "@mui/icons-material/Spa";
import { Box, Stack, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function CategoryTotals() {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Category totals</Typography>
      <Box
        classname="category totals"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "white",
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <CategoryTotal category={"Food"} amount={100}>
            <FastfoodIcon fontSize="large" />
          </CategoryTotal>
          <CategoryTotal category={"Leisure"} amount={100}>
            <SpaIcon fontSize="large" />
          </CategoryTotal>
        </Stack>

        <Stack spacing={2}>
          <CategoryTotal category={"Shopping"} amount={100}>
            <ShoppingBagIcon fontSize="large" />
          </CategoryTotal>
          <CategoryTotal category={"Transport"} amount={100}>
            <DirectionsBusFilledIcon fontSize="large" />
          </CategoryTotal>
        </Stack>

        <Stack spacing={2}>
          <CategoryTotal category={"Others"} amount={100}>
            <CheckBoxOutlineBlankIcon fontSize="large" />
          </CategoryTotal>
          <CategoryTotal category={"Add new"} amount={100}>
            <AddBoxIcon fontSize="large" />
          </CategoryTotal>
        </Stack>
      </Box>
    </Stack>
  );
}
