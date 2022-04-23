import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";
import EventEnvironment from "./EventEnvironment";
import EventHeader from "./EventHeader";
import {useEffect, useState} from "react";
import Authentication from "./Authentication";
import AccordionSection from "../AccordionSection";
import EventBody from "./EventBody";


export default function EventSettings() {
  const [header, setHeader] = useState(null);
  const [auth, setAuth] = useState(null);
  const [env, setEnv] = useState({production: false});
  const [body, setBody] = useState({});

  useEffect(() => {
    console.log("Event settings changed", header, auth, env, body);
  }, [header, auth, env, body]);

  return (
    <Box>
      <AccordionSection title="Header" expanded={true}>
        <EventHeader header={header} onHeaderChange={hdr => {setHeader(hdr); console.log("Set HEADER", hdr)}}/>
      </AccordionSection>
      <AccordionSection title="Body" expanded={true}>
        <EventBody body={body} setBody={setBody}/>
      </AccordionSection>
      <AccordionSection title="Authentication" expanded={true}>
        <Authentication auth={auth} onAuthChange={a => setAuth(a)}/>
      </AccordionSection>
      <AccordionSection title="Environment" expanded={true}>
        <EventEnvironment env={env} setEnv={setEnv}/>
      </AccordionSection>
    </Box>
  );
}
