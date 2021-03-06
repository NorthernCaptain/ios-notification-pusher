import * as React from 'react';
import {Box} from "@mui/material";
import EventEnvironment from "./EventEnvironment";
import EventHeader from "./EventHeader";
import {useEffect, useState} from "react";
import Authentication from "./Authentication";
import AccordionSection from "../AccordionSection";
import EventBody from "./EventBody";
import {useForage} from "../../utils";
import _ from "lodash";
import {eventAuth, eventBody, eventEnv, eventHeader} from "./defaults";


export default function EventSettings({event, onEventChange}) {
  const [header, setHeader] = useState(null);
  const [auth, setAuth] = useState(null);
  const [env, setEnv] = useState(null);
  const [body, setBody] = useState(null);

  const [fullEvent, setFullEvent, eventLoading] = useForage(event.id, {
    header: eventHeader,
    auth: eventAuth,
    env: eventEnv,
    body: eventBody
  }, 2000);

  useEffect(() => {
    if (fullEvent) {
      setHeader(fullEvent.header);
      setAuth(fullEvent.auth);
      setEnv(fullEvent.env);
      setBody(fullEvent.body);
      onEventChange(fullEvent);
    }
  }, [fullEvent]);

  useEffect(() => {
    console.log("Event settings changed", header, auth, env, body);
    const newEvent = {
      ...event,
      header,
      auth,
      env,
      body,
    };

    if(!eventLoading && !_.isEqual(newEvent, fullEvent)
    ) {
      console.log("Event settings changed - saving", header, auth, env, body);
      setFullEvent(newEvent);
      onEventChange(newEvent);
    }
  }, [header, auth, env, body]);

  const key = `${event.id}-${eventLoading}`;
  return (
    <Box key={key}>
      <AccordionSection title="Header" expanded={false}>
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
