import React from "react"
import Stack from '@mui/material/Stack';
import {Alert, Box, Snackbar} from "@mui/material";
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
import {SplitPane} from "react-collapse-pane";
import LogsPanel from "./LogsPanel";
import moment from "moment";
import MyDrawer from "./Drawer";
import {v4 as uuidv4} from "uuid";

localforage.config({name: 'push-notification-app-test1'});

function newEvent(lastIdx) {
  return {id: uuidv4(), name: `Notification ${lastIdx + 1}`, type: 'ios', date: Date.now()}
}

export default function MainPage(props) {
  const [events, setEvents, loading] = useForage('events', [Object.assign({}, eventStub)], 2000);
  const [selectedEventId, setSelectedEventId, selectedEventLoading] = useForage('selectedEventId', 0, 2000);
  const [fullEvent, setFullEvent] = useState(null)
  const [logs, setLogs] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [snackMessage, setSnackMessage] = useState(null)

  if (loading || selectedEventLoading) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{width: '100%'}}>
        <Typography variant="h5" mt={16}>Loading...</Typography>
      </Stack>
    )
  }

  function pushLog(log) {
    log.date = moment()
    setLogs(logs => [...logs, log]);
  }

  console.log("EVENTS", events, selectedEventId, selectedEventLoading, loading);
  const currentEvent = events[selectedEventId];

  function onSend() {
    if (fullEvent) {
      console.log("SEND!")
      pushLog({severity: "info", message: `Sending event to ${fullEvent.body.devices.length} devices`})
      if (currentEvent.type === 'ios') {
        iosSendEvent(fullEvent).then(res => {
          console.log("RES", res)
          for (let log of res.logs) {
            pushLog(log)
          }
        }).catch(err => {
          console.log("ERR", err)
          pushLog({severity: "error", message: "General processing error", error: err.message})
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

  const setName = (name) => {
    const newEvent = {...currentEvent, name};
    setEvents([...events.slice(0, selectedEventId), newEvent, ...events.slice(selectedEventId + 1)]);
  };

  const addNewEvent = () => {
    const nEvent = newEvent(events.length)
    setEvents([...events, nEvent])
    setSelectedEventId(events.length)
    pushLog({severity: "success", message: "Create new notification " + nEvent.name})
  }

  const deleteEvent = (idx) => {
    const [dEvent] = events.splice(idx, 1)
    const newEvents = [...events]
    if (newEvents.length === 0) {
      newEvents.push(newEvent(0))
    }
    if (selectedEventId >= idx) {
      setSelectedEventId(Math.max(0, selectedEventId - 1))
    }
    setEvents(newEvents)
    pushLog({severity: "success", message: "Successfully deleted " + dEvent.name})
  }

  return (
    <>
      <SplitPane split="vertical" collapse={false} initialSizes={[3, 1]}>
        <Box>
          <AppBar onSend={onSend} onDrawerOpen={() => setDrawerOpened(!drawerOpened)}/>
          <MyDrawer opened={drawerOpened}
                    events={events}
                    onClose={() => setDrawerOpened(false)}
                    onItemClick={idx => setSelectedEventId(idx)}
                    onNewItem={() => addNewEvent()}
                    currentIdx={selectedEventId}
                    onItemDelete={deleteEvent}
          />
          <Box m={2}>
            <Stack spacing={2} pb={2}>
              <MainEventHeader event={currentEvent}
                               osType={currentEvent.type}
                               setOsType={setOsType}
                               handleNameChange={setName}
              />
              {currentEvent.type === 'ios' && <IOSEventSettings event={currentEvent} onEventChange={setFullEvent}/>}
              {currentEvent.type === 'android' && <AndroidEventSettings event={currentEvent}/>}
            </Stack>
          </Box>
        </Box>
        <LogsPanel logs={logs}/>
      </SplitPane>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={5000}
        open={!!snackMessage}
        onClose={()=> setSnackMessage(null)}
      >
        <Alert onClose={()=> setSnackMessage(null)}
               severity="success" sx={{ width: '100%' }}
               variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
