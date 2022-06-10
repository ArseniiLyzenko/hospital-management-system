import React from 'react';
import {Container} from '@mui/material';
import HospitalsList from "./features/hospitalsList/HospitalsList";

function App() {
  return (
    <Container maxWidth="sm">
      <HospitalsList/>
    </Container>
  );
}

export default App;