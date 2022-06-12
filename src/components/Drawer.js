import React, {useState} from "react"
import {
  Avatar,
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  Drawer, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText, Menu, MenuItem
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import {ContentCopy, Delete} from "@mui/icons-material";


function EventMenu({opened, anchor, handleClose, handleDelete}) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchor}
      open={opened}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ContentCopy fontSize="small" />
        </ListItemIcon>
        <ListItemText>Clone</ListItemText>
      </MenuItem>
      <MenuItem onClick={ev => {
        ev.preventDefault()
        ev.stopPropagation()
        handleDelete()
      }}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  )
}

function DeleteConfirmation({opened, notificationName, handleClose, handleConfirmed}) {
  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete the notification?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are about to <b>permanently</b> delete the notification "{notificationName}".
          <br/>Are you sure you want to delete it?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No, leave it</Button>
        <Button onClick={handleConfirmed} autoFocus>
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function MyDrawer({opened, onClose, events, onItemClick, onNewItem, onItemDelete, currentIdx}) {
  const [anchor, setAnchor] = useState(null)
  const [menuEventIdx, setMenuEventIdx] = useState(null)
  const [deleteOpened, setDeleteOpened] = useState(false)

  return (
    <Drawer
      anchor="left"
      open={opened}
      onClose={onClose}
    >
      <Box
        sx={{ width: 300 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <List>
          <ListItem disablePadding={true}>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 24 }}>🚀</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Push Explorer"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
                secondary="v1.0"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding={true}>
            <ListItemButton onClick={() => onNewItem()} >
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="New Notification"/>
            </ListItemButton>
          </ListItem>
          <Divider />
          {events.map((event, idx) => (
            <ListItem disablePadding={true}
                      secondaryAction={
                        <IconButton edge="end" aria-label="more"
                                    onClick={(ev) => {
                                      setMenuEventIdx(idx)
                                      setAnchor(ev.currentTarget);
                                      ev.preventDefault();
                                      ev.stopPropagation();}}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      }
            >
              <ListItemButton
                selected={idx === currentIdx}
                onClick={() => onItemClick(idx)} >
                <ListItemAvatar>
                  <Avatar>
                    { event.type === "ios"  ? <AppleIcon/> : <AndroidIcon /> }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={event.name}
                  secondary={event.type}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <EventMenu opened={!!anchor} anchor={anchor}
                   handleClose={() => {
                     setAnchor(null)
                     setMenuEventIdx(null)
                   }}
                   handleDelete={() => {
                     setAnchor(null)
                     setDeleteOpened(true)
                   }}
        />
        <DeleteConfirmation opened={deleteOpened}
                            notificationName={events[menuEventIdx]?.name}
                            handleClose={()=> {
                              setDeleteOpened(false)
                              setMenuEventIdx(null)
                            }}
                            handleConfirmed={()=> {
                              const idxToDelete = menuEventIdx
                              setMenuEventIdx(null)
                              setDeleteOpened(false)
                              onItemDelete(idxToDelete)
                            }}
        />
      </Box>
    </Drawer>
  )
}
