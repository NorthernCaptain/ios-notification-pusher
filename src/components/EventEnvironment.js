import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function EventEnvironment() {
  return (
    <FormControl>
      <RadioGroup
        defaultValue="production"
        name="env-radio-buttons-group"
      >
        <FormControlLabel value="production" control={<Radio />} label="Production" />
        <FormControlLabel value="sandbox" control={<Radio />} label="Sandbox" />
      </RadioGroup>
    </FormControl>
  );
}
