import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function ConfirmationDialog({ callBack }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseWithCallback = () => {
    callBack();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete this expense?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleCloseWithCallback}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
