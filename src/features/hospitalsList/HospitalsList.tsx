import React, {useCallback, useEffect} from 'react';

import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {
  updateHospital,
  deleteHospitalById,
  selectHospitals,
  addHospital,
  fetchHospitals,
  selectIsLoading,
  selectError
} from "./hospitalsSlice";

import {Button, Stack, Typography, CircularProgress} from "@mui/material";
import Hospital from "./Hospital";
import {IHospital, THospitalId} from "../../types";

const HospitalsList = () => {
  const hospitals = useAppSelector(selectHospitals);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const handleSave   = useCallback((data: IHospital) => dispatch(updateHospital(data)),[dispatch]);
  const handleDelete = useCallback((id: THospitalId) => dispatch(deleteHospitalById(id)),[dispatch]);

  useEffect(() => {
    dispatch(fetchHospitals());
  }, [dispatch]);

  return (
    <Stack spacing={4}>
      <Typography variant="h1" fontSize="2rem" textAlign="center" marginTop={2}>
        Hospitals List <Typography variant="caption">by Arsenii</Typography>
      </Typography>

      <Button
        variant="outlined"
        disabled={isLoading || !!error}
        onClick={() => dispatch(addHospital())}
      >
        Add Hospital
      </Button>

      {isLoading &&
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
          <CircularProgress size={20}/>
          <Typography variant="button">Loading...</Typography>
        </Stack>
      }

      {!isLoading && !error && hospitals.length > 0 &&
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
      }

      {!isLoading && !error && hospitals.length < 1 &&
        <Typography textAlign="center">Empty :)</Typography>
      }

      {!isLoading && error &&
        <Typography textAlign="center">{error}</Typography>
      }
    </Stack>
  );
};

export default HospitalsList;