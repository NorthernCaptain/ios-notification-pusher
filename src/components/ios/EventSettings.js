import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";
import EventEnvironment from "./EventEnvironment";
import EventHeader from "./EventHeader";
import {useState} from "react";
import Authentication from "./Authentication";

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: theme.palette.paper2.main,
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
}));

export default function EventSettings() {
  const [header, setHeader] = useState(null);
  const [auth, setAuth] = useState(null);
  const [env, setEnv] = useState({production: false});

  return (
    <Box>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <HeaderTypography>Header</HeaderTypography>
        </AccordionSummary>
        <AccordionDetails>
          <EventHeader header={header} onHeaderChange={hdr => {setHeader(hdr); console.log("Set HEADER", hdr)}}/>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <HeaderTypography>Body</HeaderTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <HeaderTypography>Authentication</HeaderTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Authentication auth={auth} onAuthChange={a => setAuth(a)}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <HeaderTypography>Environment</HeaderTypography>
        </AccordionSummary>
        <AccordionDetails>
          <EventEnvironment env={env} setEnv={setEnv}/>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
