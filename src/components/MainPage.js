import * as React from "react"
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";
import AppBar from "./AppBar";
import IOSEventSettings from "./ios/EventSettings";
import MainEventHeader from "./MainEventHeader";
import {useState} from "react";
import AndroidEventSettings from "./android/EventSettings";
import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';
import {useForage} from "../utils";
import Typography from "@mui/material/Typography";

localforage.config({name: 'push-notification-app-test1'});
const defaultId = uuidv4();

export default function MainPage(props) {
  const [events, setEvents, loading] = useForage('events',
                              [{id: defaultId, name: 'Notification 1', type: 'ios', date: Date.now()}],
                                2000);
  const [selectedEventId, setSelectedEventId, selectedEventLoading] = useForage('selectedEventId', 0, 2000);

  function onSend() {
    console.log("SEND!")
  }

  if(loading || selectedEventLoading) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
        <Typography variant="h5" mt={16}>Loading...</Typography>
      </Stack>
    )
  }

  console.log("EVENTS", events, selectedEventId, selectedEventLoading, loading);
  const currentEvent = events[selectedEventId];

  const setOsType = (type) => {
    const newEvent = {...currentEvent, type};
    setEvents([...events.slice(0, selectedEventId), newEvent, ...events.slice(selectedEventId + 1)]);
  };

  return (
    <Box>
      <AppBar onSend={onSend}/>
      <Box m={2}>
        <Stack spacing={2}>
          <MainEventHeader osType={currentEvent.type} setOsType={setOsType}/>
          {currentEvent.type === 'ios' && <IOSEventSettings event={currentEvent}/>}
          {currentEvent.type === 'android' && <AndroidEventSettings event={currentEvent}/>}
        </Stack>
      </Box>
    </Box>
  )
}
