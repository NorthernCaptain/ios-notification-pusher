import * as React from "react"
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";
import AppBar from "./AppBar";
import IOSEventSettings from "./ios/EventSettings";
import MainEventHeader from "./MainEventHeader";
import {useState} from "react";
import AndroidEventSettings from "./android/EventSettings";

export default function MainPage(props) {
  const [osType, setOsType] = useState('ios');

  function onSend() {
    console.log("SEND!")
  }

  return (
    <Box>
      <AppBar onSend={onSend}/>
      <Box m={2}>
        <Stack spacing={2}>
          <MainEventHeader osType={osType} setOsType={setOsType}/>
          {osType === 'ios' && <IOSEventSettings/>}
          {osType === 'android' && <AndroidEventSettings/>}
        </Stack>
      </Box>
    </Box>
  )
}
