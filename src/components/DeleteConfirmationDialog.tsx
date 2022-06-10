import React from "react";
import {Dialog, DialogActions, DialogTitle, Button} from "@mui/material";

interface IProps {
  isOpen: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog = ({isOpen, onDelete, onCancel}: IProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        Delete permanently?
      </DialogTitle>
      <DialogActions>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;