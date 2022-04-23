import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box} from "@mui/material";
import EventEnvironment from "./EventEnvironment";
import EventHeader from "./EventHeader";
import {useState} from "react";
import Authentication from "./Authentication";
import AccordionSection from "../AccordionSection";


export default function EventSettings() {
  const [header, setHeader] = useState(null);
  const [auth, setAuth] = useState(null);
  const [env, setEnv] = useState({production: false});

  return (
    <Box>
      <AccordionSection title="Header" expanded={true}>
        <EventHeader header={header} onHeaderChange={hdr => {setHeader(hdr); console.log("Set HEADER", hdr)}}/>
      </AccordionSection>
      <AccordionSection title="Body" expanded={true}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
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
