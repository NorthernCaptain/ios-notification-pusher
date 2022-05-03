import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Stack from "@mui/material/Stack";
import {DateTimePicker} from "@mui/x-date-pickers";
import BaseTextField from "../BaseTextField";
import moment from "moment";
import {eventHeader} from "./defaults";

const pushTypes = [
  {
    value: 'alert',
    label: 'alert',
  },
  {
    value: 'background',
    label: 'background',
  },
]

const priorities = [
  {
    value: 10,
    label: 'immediately',
  },
  {
    value: 5,
    label: 'normal',
  },
]

export default function EventHeader({header, onHeaderChange}) {
  header = header || eventHeader;

  function commitHeader(key, value) {
    let newHeader = {...header};
    newHeader[key] = value;
    onHeaderChange(newHeader);
  }

  return (
    <Stack spacing={3}>
      <BaseTextField
        id="push-type"
        select
        label="Push type"
        value={header.pushType}
        onChange={(e) => commitHeader("pushType", e.target.value)}
        helperText="Alert - visible to the user, Background - invisible"
      >
        {pushTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseTextField>

      <BaseTextField
        id="collapse-id"
        label="Collapse id"
        value={header.collapseId}
        onChange={(e) => commitHeader("collapseId", e.target.value)}
        helperText="Identifier to collapse multiple notifications into one"
      />

      <BaseTextField
        id="priority"
        select
        label="Message priority"
        value={header.priority}
        onChange={(e) => commitHeader("priority", e.target.value)}
        helperText="Immediately or normal to save battery"
      >
        {priorities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseTextField>

      <BaseTextField
        id="notification-id"
        label="Notification id"
        value={header.notificationId}
        onChange={(e) => commitHeader("notificationId", e.target.value)}
        helperText="Unique identifier (UUID) of the notification, auto-generated if empty"
      />

      <DateTimePicker
        label="Expiration"
        value={header.expiry ? moment(header.expiry) : null}
        onChange={(e) => {console.log("DATE", e);commitHeader("expiry", e ? e.valueOf() : null)}}
        renderInput={(params) => <BaseTextField {...params}
                                                helperText="Date at which the notification is no longer valid. Empty - no limit"/>}
      />
    </Stack>
  )
}
