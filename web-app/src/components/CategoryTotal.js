import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function CategoryTotal({ children, category, amount }) {
  return (
    <>
      <Stack direction="row" spacing={1}>
        {children}
        <Stack>
          <Typography fontWeight="bold">{category}</Typography>
          <Typography variant="subtitle2">${amount}</Typography>
        </Stack>
      </Stack>
    </>
  );
}
