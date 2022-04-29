import * as React from 'react';
import Stack from "@mui/material/Stack";
import JsonEditor from "../JsonEditor";
import BaseTextField from "../BaseTextField";
import {useEffect, useState} from "react";
import {shallowEqual} from "../../utils";

export default function EventBody({body, setBody}) {
  body = body || {};
  const [bundleId, setBundleId] = useState(body.bundleId || '');
  const [devices, setDevices] = useState((body.devices || []).join('\n'));
  const [code, setCode] = useState( body.code ||
    `{
  "aps": {
    "alert": {
      "title": "Message title",
      "subtitle": "Short message subtitle",
      "body": "This is the body text of your message"
    }
    "mutable-content": 0
  }
}
`);

  useEffect(() => {
    if(body.bundleId !== bundleId ||
      body.code !== code ||
      !shallowEqual(body.devices, devices)) {
      console.log(`DEVICES [${devices}]`);
      setBody({
        bundleId,
        devices: devices.split('\n').filter(d => d.trim().length > 0).map(d => d.trim()),
        code
      });
    }
  }, [bundleId, devices, code]);


  return (
    <Stack spacing={3}>
      <BaseTextField
        id="bundle-id"
        label="Bundle id"
        value={bundleId}
        onChange={(e) => setBundleId(e.target.value)}
        helperText="The topic for the notification, usually the bundle id of the app"
      />
      <BaseTextField
        id="devices-id"
        label="Device token"
        multiline
        minRows={2}
        maxRows={5}
        value={devices}
        onChange={e=>setDevices(e.target.value)}
        helperText="The device token of the device to send the notification to. Put every token on a new line."
      />
      <JsonEditor code={code} setCode={setCode}/>
    </Stack>
  );
}
