import React, {useCallback} from 'react';

import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {updateHospital, deleteHospitalById, selectHospitals, addHospital} from "./hospitalsSlice";

import {Button, Stack, Typography} from "@mui/material";
import Hospital from "./Hospital";
import {IHospital, THospitalId} from "../../types";

const HospitalsList = () => {
  const hospitals = useAppSelector(selectHospitals);
  const dispatch = useAppDispatch();

  const handleSave   = useCallback((data: IHospital) => dispatch(updateHospital(data)),[dispatch]);
  const handleDelete = useCallback((id: THospitalId) => dispatch(deleteHospitalById(id)),[dispatch]);

  return (
    <Stack spacing={4}>
      <Typography variant="h1" fontSize="2rem" textAlign="center" marginTop={2}>
        Hospitals List
      </Typography>

      <Button variant="outlined" onClick={() => dispatch(addHospital())}>
        Add Hospital
      </Button>

      {hospitals.length
        ?
        <Stack spacing={2}>
          {hospitals.map(hospital =>
            <Hospital
              key={hospital.id}
              hospitalData={hospital}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          )}
        </Stack>
        :
        <Typography textAlign="center">Empty :)</Typography>
      }
    </Stack>
  );
};

export default HospitalsList;