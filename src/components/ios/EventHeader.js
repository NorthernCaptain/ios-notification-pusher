import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {DateTimePicker} from "@mui/x-date-pickers";
import {shallowEqual} from "../../utils";
import BaseTextField from "../BaseTextField";

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

const priotities = [
  {
    value: '10',
    label: 'immediately',
  },
  {
    value: '5',
    label: 'normal',
  },
]

export default function EventHeader({header, onHeaderChange}) {
  header = header || { pushType: 'alert', priority: '10', collapseId: '', id: '', expiry: null };
  const [pushType, setPushType] = useState(header.pushType);
  const [priority, setPriority] = useState(header.priority);
  const [collapseId, setCollapseId] = useState(header.collapseId);
  const [notificationId, setNotificationId] = useState(header.id);
  const [expiryDate, setExpiryDate] = useState(header.expiry ? new Date(header.expiry) : null);

  function constructHeader() {
    return {
      collapseId,
      id: notificationId,
      pushType,
      priority,
      expiry: expiryDate ? expiryDate.getTime() : null,
    }
  }

  useEffect(() => {
    let hdr = constructHeader();
    if(shallowEqual(hdr, header)) return;
    console.log('header', hdr);
    if(onHeaderChange) onHeaderChange(hdr);
  }, [collapseId, notificationId, pushType, priority, expiryDate]);

  return (
    <Stack spacing={3}>
      <BaseTextField
        id="push-type"
        select
        label="Push type"
        value={pushType}
        onChange={(e) => setPushType(e.target.value)}
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
        value={collapseId}
        onChange={(e) => setCollapseId(e.target.value)}
        helperText="Identifier to collapse multiple notifications into one"
      />

      <BaseTextField
        id="priority"
        select
        label="Message priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        helperText="Immediately or normal to save battery"
      >
        {priotities.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </BaseTextField>

      <BaseTextField
        id="notification-id"
        label="Notification id"
        value={notificationId}
        onChange={(e) => setNotificationId(e.target.value)}
        helperText="Unique identifier (UUID) of the notification, auto-generated if empty"
      />

      <DateTimePicker
        label="Expiration"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e)}
        renderInput={(params) => <BaseTextField {...params} helperText="Date at which the notification is no longer valid. Empty - no limit"/>}
      />
    </Stack>
  )
}
