import * as React from 'react';
import Stack from "@mui/material/Stack";
import JsonEditor from "../JsonEditor";
import BaseTextField from "../BaseTextField";
import {eventBody} from "./defaults";

export default function EventBody({body, setBody}) {
  body = body || eventBody;

  function commitBody(key, value) {
    setBody({...body, [key]: value});
  }

  return (
    <Stack spacing={3}>
      <BaseTextField
        id="bundle-id"
        label="Bundle id"
        value={body.bundleId}
        onChange={(e) => commitBody("bundleId", e.target.value)}
        helperText="The topic for the notification, usually the bundle id of the app"
      />
      <BaseTextField
        id="devices-id"
        label="Device token"
        multiline
        minRows={2}
        maxRows={5}
        value={body.devices.join('\n')}
        onChange={e=>commitBody("devices", e.target.value.split('\n'))}
        helperText="The device token of the device to send the notification to. Put every token on a new line."
      />
      <JsonEditor code={body.code} setCode={e => commitBody("code", e)}/>
    </Stack>
  );
}
