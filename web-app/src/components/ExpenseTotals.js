import { Typography } from "@mui/material";

export default function ExpenseTotals({ totalSgd, totalOverseas }) {
  if (totalOverseas) {
    return (
      <Typography>
        SGD: ${totalSgd} | Overseas currency: ${totalOverseas}
      </Typography>
    );
  }
  return <Typography>SGD: ${totalSgd}</Typography>;
}
