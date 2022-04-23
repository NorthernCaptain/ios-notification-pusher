import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {shallowEqual} from "../../utils";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import KeyIcon from '@mui/icons-material/Key';
import BadgeIcon from '@mui/icons-material/Badge';
import DropZone from "../DropZone";
import BaseTextField from "../BaseTextField";

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
  const data = auth || { type: 0, passphrase: '', keyId: '', teamId: '' };
  const [index, setIndex] = useState(data.type);
  const [keyId, setKeyId] = useState(data.keyId);
  const [teamId, setTeamId] = useState(data.teamId);
  const [passphrase, setPassphrase] = useState(data.passphrase);
  const [certFile, setCertFile] = useState(data.certFile);
  const [keyFile, setKeyFile] = useState(data.keyFile);

  function constructAuth(){
    return {
      type: index,
      keyId: keyId,
      teamId: teamId,
      passphrase: passphrase,
      certFile: certFile,
      keyFile: keyFile
    }
  }

  useEffect(() => {
    let auth = constructAuth();
    if(shallowEqual(auth, data)) return;
    if(onAuthChange) onAuthChange(auth);
  }, [index, keyId, teamId, passphrase, certFile, keyFile]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={index} onChange={(e,val)=>setIndex(val)} aria-label="auth tabs">
          <Tab label="Certificate" icon={<BadgeIcon />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Key" icon={<KeyIcon />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={index} index={0}>
        <CertificateAuth passphrase={passphrase} setPassphrase={setPassphrase}
                         certFile={certFile} setCertFile={f => {console.log("Selected cert file", f); setCertFile(f)}}/>
      </TabPanel>
      <TabPanel value={index} index={1}>
        <KeyAuth keyId={keyId} setKeyId={setKeyId} teamId={teamId} setTeamId={setTeamId} keyFile={keyFile} setKeyFile={setKeyFile}/>
      </TabPanel>
    </Box>
  );
}
