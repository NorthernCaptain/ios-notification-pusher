import * as React from "react"
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Box} from "@mui/material";
import AppBar from "./AppBar";
import EventSettings from "./ios/EventSettings";
import MainEventHeader from "./MainEventHeader";
import {useState} from "react";
import AEventSettings from "./android/AEventSettings";

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
          {osType === 'ios' && <EventSettings/>}
          {osType === 'android' && <AEventSettings/>}
        </Stack>
      </Box>
    </Box>
  )
}
