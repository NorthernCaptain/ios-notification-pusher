import * as React from "react"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

export default function MainEventHeader({osType, setOsType}) {
  return (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h6">
        Notification 1
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={osType}
        exclusive
        onChange={(event, value) => setOsType(value)}
      >
        <ToggleButton value="ios">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={"4px"}>
            <AppleIcon/>
            <Typography variant="body">
              iOS
            </Typography>
          </Stack>
        </ToggleButton>
        <ToggleButton value="android">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={"4px"}>
            <AndroidIcon/>
            <Typography variant="body">
              Android
            </Typography>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>    </Stack>
  )
}
