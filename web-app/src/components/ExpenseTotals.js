import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function ExpenseTotals({ totalSgd, totalOverseas }) {
  if (totalOverseas) {
    return (
      <Stack>
        <Typography><b>SGD:</b> ${totalSgd.toFixed(2)}</Typography>
        <Typography><b>Overseas currency:</b> ${totalOverseas.toFixed(2)}</Typography>
      </Stack>
    );
  }
  return <Typography><b>SGD:</b> ${totalSgd.toFixed(2)}</Typography>;
}
