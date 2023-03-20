import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [telegramId, setTelegramId] = useState()

  return (
    <>
      <Stack direction={"row"} justifyContent={"center"} spacing={1}>
        <TextField
          fullWidth
          onChange={(event) => setTelegramId(event.target.value)}
          label="Enter telegram ID here"
        />
        <Button
          variant="outlined"
          style={{
            fontWeight: "bold",
          }}
          component={RouterLink}
          to={`/${telegramId}`}
        >
          Login
        </Button>
      </Stack>
    </>
  );
}
