import React from 'react';
import TextField from "@mui/material/TextField";

export const defaultTextProps = { variant : "filled", size: "normal", margin: "none" };

export default function BaseTextField(props) {
  return (
      <TextField
        {...defaultTextProps}
        {...props}
      >
        {props.children}
      </TextField>
  )
}
