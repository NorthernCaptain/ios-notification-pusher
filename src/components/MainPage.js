import * as React from "react"
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Box} from "@mui/material";
import AppBar from "./AppBar";
import EventSettings from "./ios/EventSettings";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainPage(props) {
  function onSend() {
    console.log("SEND!")
  }

  return (
    <Box>
      <AppBar onSend={onSend}/>
      <Box m={2}>
        <Stack spacing={2}>
          <Item>Notification 1 (placeholder)</Item>
          <EventSettings/>
        </Stack>
      </Box>
    </Box>
  )
}
