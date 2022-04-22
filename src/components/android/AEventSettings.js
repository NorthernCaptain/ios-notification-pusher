import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import ConstructionIcon from '@mui/icons-material/Construction';

export default function AEventSettings() {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{paddingTop: "96px"}}>
      <ConstructionIcon fontSize="large" />
      <Typography variant="h5">Under construction</Typography>
    </Stack>
  );
}
