import React, {useRef, useState} from 'react';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import {
  Save,
  Edit,
  Delete,
  DoDisturb,
  ExpandMore,
} from "@mui/icons-material";

import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";

import {IHospital, TDeleteHospitalById, TSetHospitalById} from "../../types";

interface Props {
  hospitalData: IHospital;
  onSave: TSetHospitalById;
  onDelete: TDeleteHospitalById;
}

const Hospital = ({hospitalData, onSave, onDelete}: Props) => {
  console.log("RENDER HOSPITAL")

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(hospitalData.hospitalName === "");
  const [isExpanded, setIsExpanded] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isHospitalNameError, setIsHospitalNameError] = useState(false);
  const hospitalNameInputRef = useRef<HTMLInputElement>();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isHospitalNameError) {
      hospitalNameInputRef.current?.focus();
      return;
    }
    if (isEditing) setIsEditing(false);
    if (isCreating) setIsCreating(false);
    const formData = new FormData(e.currentTarget);
    console.log(formData.entries())
    const fieldsValues = Object.fromEntries(formData.entries());
    //TODO: fix typescript
    //@ts-ignore
    onSave({
      ...fieldsValues,
      id: hospitalData.id
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    onDelete(hospitalData.id);
  };

  return (
    <form onSubmit={handleSave} onReset={handleCancel}>
      <Accordion expanded={isExpanded || isCreating || isEditing}>
        <AccordionSummary expandIcon={<ExpandMore/>} onClick={() => setIsExpanded(prevState => !prevState)}>
          {!isEditing && !isCreating
            ?
            <Typography variant="h6">
              {hospitalData.hospitalName}
            </Typography>
            :
            <TextField
              name="hospitalName"
              defaultValue={hospitalData.hospitalName}
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
              onClick={e => e.stopPropagation()} // prevents closing of accordion on editing
              onBlur={e => setIsHospitalNameError(e.target.value === "")}
              onFocus={() => setIsHospitalNameError(false)}
            />
          }
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="overline" textAlign="center">
              Contacts
            </Typography>

            <TextField
              name="contactPerson"
              defaultValue={hospitalData.contactPerson}
              label="Contact Person"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />
            {/*TODO: phone number mask*/}
            <TextField
              name="contactCellphone"
              defaultValue={hospitalData.contactCellphone}
              label="Cellphone"
              variant="outlined"
              size="small"
              type="tel"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <Typography variant="overline" textAlign="center">Address</Typography>

            <TextField
              name="streetLine1"
              defaultValue={hospitalData.streetLine1}
              label="Street Line 1"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <TextField
              name="streetLine2"
              defaultValue={hospitalData.streetLine2}
              label="Street Line 2"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <TextField
              name="city"
              defaultValue={hospitalData.city}
              label="City"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <TextField
              name="state"
              defaultValue={hospitalData.state}
              label="State/Province/Region"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <TextField
              name="zip"
              defaultValue={hospitalData.zip}
              label="ZIP/Postal Code"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: !isEditing && !isCreating }}
            />

            <Stack direction="row" spacing={2}>
              {(isCreating || !isEditing) &&
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete/>}
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              }

              {isEditing &&
                <Button
                  type="reset"
                  variant="outlined"
                  color="warning"
                  startIcon={<DoDisturb/>}
                >
                  Cancel
                </Button>
              }

              {(isEditing || isCreating) &&
                <Button
                  type="submit"
                  variant="outlined"
                  startIcon={<Save/>}
                >
                  Save
                </Button>
              }

              {(!isEditing && !isCreating) &&
                <Button
                  variant="outlined"
                  startIcon={<Edit/>}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              }
            </Stack>
          </Stack>

          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onDelete={handleDelete}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />

        </AccordionDetails>
      </Accordion>
    </form>
  );
};

export default React.memo(Hospital);
