import * as React from 'react';
import Stack from "@mui/material/Stack";
import JsonEditor from "../JsonEditor";

export default function EventBody({body, setBody}) {
  const [code, setCode] = React.useState(
    `{
  "setup": {
    "utc_start_time": [
      2022,
      4,
      17,
      17,
      59,
      14,
      0
    ],
    "phones": {
      "8844B37A-A285-4984-8DB0-1BEAEDCA9816": {
        "id": "8844B37A-A285-4984-8DB0-1BEAEDCA9816"
      }
    }
  }
}
`
  );

  return (
    <Stack spacing={3}>
      <JsonEditor code={code} setCode={setCode}/>
    </Stack>
  );
}
