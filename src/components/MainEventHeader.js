import * as React from "react"
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton, TextField,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";

function EditNameDialog({opened, handleClose, handleChange, event}) {
  const [name, setName] = useState(event.name)
  return (
    <Dialog open={opened} onClose={handleClose}>
      <DialogTitle>Change Notification name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Change the name of the notification. This reflects how the notification is shown in this app.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Notification name"
          fullWidth
          variant="standard"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleChange(name)}>Change</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function MainEventHeader({osType, setOsType, event, handleNameChange}) {
  const [editNameOpen, setEditNameOpen] = useState(false)
  return (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h6">
          {event.name}
        </Typography>
        <IconButton aria-label="edit" onClick={()=>{setEditNameOpen(true)}}>
          <EditIcon color="secondary"/>
        </IconButton>
      </Stack>
      <ToggleButtonGroup
        color="primary"
        value={osType}
        exclusive
        onChange={(event, value) => setOsType(value)}
      >
        <ToggleButton value="ios">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={"4px"}>
            <AppleIcon/>
            <Typography variant="body">
              iOS
            </Typography>
          </Stack>
        </ToggleButton>
        <ToggleButton value="android">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={"4px"}>
            <AndroidIcon/>
            <Typography variant="body">
              Android
            </Typography>
          </Stack>
        </ToggleButton>
      </ToggleButtonGroup>
      <EditNameDialog event={event}
                      handleClose={()=>setEditNameOpen(false)}
                      opened={editNameOpen}
                      handleChange={(name) => {
                        setEditNameOpen(false)
                        handleNameChange(name)
                      }}
      />
    </Stack>
  )
}
