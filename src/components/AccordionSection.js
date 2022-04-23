import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  backgroundColor: theme.palette.paper2.main,
}));

export default function AccordionSection({title, id, children, expanded}) {
  return (
    <Accordion defaultExpanded={expanded}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={id}
      >
        <HeaderTypography>{title}</HeaderTypography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
