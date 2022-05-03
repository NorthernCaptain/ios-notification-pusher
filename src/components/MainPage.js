import React from "react"
import Stack from '@mui/material/Stack';
import {Box} from "@mui/material";
import AppBar from "./AppBar";
import IOSEventSettings from "./ios/EventSettings";
import MainEventHeader from "./MainEventHeader";
import AndroidEventSettings from "./android/EventSettings";
import localforage from "localforage";
import {useForage} from "../utils";
import Typography from "@mui/material/Typography";
import {eventStub} from "./ios/defaults";
import {useState} from "react";
import iosSendEvent from "./ios/Send";

localforage.config({name: 'push-notification-app-test1'});

export default function MainPage(props) {
  const [events, setEvents, loading] = useForage('events', [eventStub],2000);
  const [selectedEventId, setSelectedEventId, selectedEventLoading] = useForage('selectedEventId', 0, 2000);
  const [fullEvent, setFullEvent] = useState(null)

  if(loading || selectedEventLoading) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
        <Typography variant="h5" mt={16}>Loading...</Typography>
      </Stack>
    )
  }

  console.log("EVENTS", events, selectedEventId, selectedEventLoading, loading);
  const currentEvent = events[selectedEventId];

  function onSend() {
    if(fullEvent) {
      console.log("SEND!")
      if(currentEvent.type === 'ios') {
        iosSendEvent(fullEvent).then(res => {
          console.log("RES", res)
        }).catch(err => {
          console.log("ERR", err)
        })
      } else {
        AndroidEventSettings.send(fullEvent);
      }
    }
  }

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
          {currentEvent.type === 'ios' && <IOSEventSettings event={currentEvent} onEventChange={setFullEvent}/>}
          {currentEvent.type === 'android' && <AndroidEventSettings event={currentEvent}/>}
        </Stack>
      </Box>
    </Box>
  )
}
