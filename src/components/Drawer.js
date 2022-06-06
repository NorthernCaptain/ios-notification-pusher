import React from "react"
import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';

export default function MyDrawer({opened, onClose}) {
  return (
    <Drawer
      anchor="left"
      open={opened}
      onClose={onClose}
    >
      <Box
        sx={{ width: 250 }}
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
            <ListItemButton>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="New Notification"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}
