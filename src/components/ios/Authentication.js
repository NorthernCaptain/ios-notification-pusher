import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';
import DropZone from "../DropZone";
import BaseTextField from "../BaseTextField";
import {eventAuth} from "./defaults";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb:3, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CertificateAuth({passphrase, setPassphrase, certFile, setCertFile}) {
  return (
    <Stack spacing={3}>
      <DropZone text="Drag 'n' drop a .p12 certificate here, or click to select it"
        onChoose={files => setCertFile(files[0])} file={certFile} extensions={[".p12", ".key"]} accept="application/x-pkcs12"/>
      <BaseTextField
        id="passphrase-id"
        label="Passphrase"
        type="password"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        helperText="Passphrase to unlock the certificate"
      />
    </Stack>
  )
}

function KeyAuth({keyId, setKeyId, teamId, setTeamId, keyFile, setKeyFile}) {
  return (
    <Stack spacing={3}>
      <DropZone text="Drag 'n' drop a .p8 key file here, or click to select it"
                onChoose={files => setKeyFile(files[0])} file={keyFile} extensions={[".p8"]} accept="application/pkcs8"/>
      <BaseTextField
        id="team-id"
        label="Team id"
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
        helperText="The Team id of your Apple Developer account"
      />
      <BaseTextField
        id="key-id"
        label="Key id"
        value={keyId}
        onChange={(e) => setKeyId(e.target.value)}
        helperText="The key id of the p8 file, check Apple dev console - certificates - keys"
      />
    </Stack>
  )
}

export default function Authentication({auth, onAuthChange}) {
  const data = auth || eventAuth;

  function commitAuth(key, value) {
    onAuthChange({...data, [key]: value});
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={data.type} onChange={(e,val)=>commitAuth("type", val)} aria-label="auth tabs">
          <Tab label="Certificate" icon={<BadgeIcon />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Key" icon={<KeyIcon />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={data.type} index={0}>
        <CertificateAuth passphrase={data.passphrase} setPassphrase={val => commitAuth("passphrase", val)}
                         certFile={data.certFile} setCertFile={f => {console.log("Selected cert file", f); commitAuth("certFile", {name: f.name, path: f.path})}}/>
      </TabPanel>
      <TabPanel value={data.type} index={1}>
        <KeyAuth keyId={data.keyId} setKeyId={ k => commitAuth("keyId", k)}
                 teamId={data.teamId} setTeamId={t => commitAuth("teamId", t)}
                 keyFile={data.keyFile} setKeyFile={f => commitAuth("keyFile", {name: f.name, path: f.path})}/>
      </TabPanel>
    </Box>
  );
}
