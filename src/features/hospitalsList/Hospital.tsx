import React, {useCallback, useRef, useState} from 'react';

import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import {
  Dialog, DialogTitle, DialogActions
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import {SetHospitalById} from "../types";
import {IHospital} from "../features/hospitalsList/hospitalsSlice";

interface Props {
  hospitalData: IHospital;
  onSave: SetHospitalById;
  onDelete: () => void;
}

const Hospital = ({hospitalData, onSave, onDelete}: Props) => {
  console.log("RENDER HOSPITAL")

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(hospitalData.hospitalName === "");

  const [data, setData] = useState(hospitalData);
  // const [city, setCity] = useState(hospitalData.city);

  // const handleHospitalPropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setData({
  //       ...data,
  //       [e.target.name]: e.target.value,
  //     });
  //     console.log("CALLBACK");
  // };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isHospitalNameError, setIsHospitalNameError] = useState(false);
  const hospitalNameInputRef = useRef<HTMLInputElement>();

  const [isExpanded, setIsExpanded] = useState(data.hospitalName === "");

  const handleHospitalPropertyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log("CALLBACK");
  }, [data]);

  const handleSave = () => {
    if (isHospitalNameError) {
      hospitalNameInputRef.current?.focus();
      return;
    }
    if (isEditing) setIsEditing(false);
    if (isCreating) setIsCreating(false);
    onSave(data);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setData(hospitalData);
  };

  //TODO: ADD REQUIRED
  return (
    <Accordion expanded={isExpanded || isCreating || isEditing}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} onClick={() => setIsExpanded(prevState => !prevState)}>
        {!isEditing && !isCreating
          ? <Typography variant="h6">
              {data.hospitalName}
            </Typography>
          : <TextField
              value={data.hospitalName}
              name="hospitalName"
              label="Hospital Name"
              variant="outlined"
              autoComplete="off"
              autoFocus
              required
              fullWidth
              InputProps={{ readOnly: !isEditing && !isCreating }}
              error={isHospitalNameError}
              helperText={isHospitalNameError ? "Hospital name is required" : ""}
              inputRef={hospitalNameInputRef}
              onChange={handleHospitalPropertyChange}
              onClick={e => e.stopPropagation()} // prevents closing of accordion on editing
              onBlur={(e) => setIsHospitalNameError(e.target.value === "")}
              onFocus={() => setIsHospitalNameError(false)}
            />
      }
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Typography variant={"overline"} textAlign={"center"}>
            Contacts
          </Typography>

          <TextField
            label="Contact Person"
            name="contactPerson"
            variant="outlined"
            // defaultValue={data.contactPerson}
            value={data.contactPerson}
            onChange={handleHospitalPropertyChange}
            size="small"
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />
          {/*TODO: mask for phone*/}
          <TextField
            label="Cellphone"
            name="contactCellphone"
            variant="outlined"
            type="tel"
            // defaultValue={data.contactCellphone}
            value={data.contactCellphone}
            onChange={handleHospitalPropertyChange}
            size={"small"}
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <Typography variant={"overline"} textAlign={"center"}>Address</Typography>

          <TextField
            label="Street Line 1"
            name="streetLine1"
            variant="outlined"
            // defaultValue={data.streetLine1}
            value={data.streetLine1}
            onChange={handleHospitalPropertyChange}
            size={"small"}
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <TextField
            label="Street Line 2"
            name="streetLine2"
            variant="outlined"
            // defaultValue={data.streetLine2}
            value={data.streetLine2}
            onChange={handleHospitalPropertyChange}
            size={"small"}
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <TextField
            label="City"
            name="city"
            variant="outlined"
            value={data.city}
            onChange={handleHospitalPropertyChange}
            size="small"
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <TextField
            label="State/Province/Region"
            name="state"
            variant="outlined"
            // defaultValue={data.state}
            value={data.state}
            onChange={handleHospitalPropertyChange}
            size={"small"}
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <TextField
            label="ZIP/Postal Code"
            name="zip"
            variant="outlined"
            // defaultValue={data.zip}
            value={data.zip}
            onChange={handleHospitalPropertyChange}
            size={"small"}
            InputProps={{
              readOnly: !isEditing && !isCreating,
            }}
          />

          <Stack direction={"row"} spacing={2}>
            {(isCreating || !isEditing) &&
              <Button
                variant={"outlined"}
                color={"error"}
                startIcon={<DeleteIcon/>}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </Button>
            }

            {isEditing &&
              <Button
                variant={"outlined"}
                color={"warning"}
                startIcon={<DoDisturbIcon/>}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            }

            {(isEditing || isCreating) &&
              <Button
                variant={"outlined"}
                startIcon={<SaveIcon/>}
                onClick={handleSave}
              >
                Save
              </Button>
            }

            {(!isEditing && !isCreating) &&
              <Button
                variant={"outlined"}
                startIcon={<EditIcon/>}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            }
          </Stack>
        </Stack>

        {/*TODO: move Dialog to new file?*/}
        <Dialog open={isDeleteDialogOpen}>
          <DialogTitle id="alert-dialog-title">
            {"Permanently delete item?"}
          </DialogTitle>
          <DialogActions>
            <Button
              color="error"
              onClick={() => {
                onDelete();
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setIsDeleteDialogOpen(false)} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </AccordionDetails>
    </Accordion>
  );
};

export default Hospital;
