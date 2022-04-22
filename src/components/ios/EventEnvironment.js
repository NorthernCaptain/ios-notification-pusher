import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function EventEnvironment({env, setEnv}) {
  const value = env?.production ? 'production' : 'sandbox';
  return (
    <FormControl>
      <RadioGroup
        defaultValue="production"
        name="env-radio-buttons-group"
        value={value}
        onChange={(e) => setEnv({production: e.target.value === 'production'})}
      >
        <FormControlLabel value="production" control={<Radio />} label="Production" />
        <FormControlLabel value="sandbox" control={<Radio />} label="Sandbox" />
      </RadioGroup>
    </FormControl>
  );
}
