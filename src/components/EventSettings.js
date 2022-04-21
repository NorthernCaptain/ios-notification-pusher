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

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: theme.palette.paper2.main,
}));


export default function EventSettings() {
  const [header, setHeader] = useState(null);

  return (
    <Box>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>HEADER</Typography>
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
          <Typography>BODY</Typography>
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
          <Typography>AUTHENTICATION</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>ENVIRONMENT</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EventEnvironment />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
