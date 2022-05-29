import * as React from 'react';
import {Alert, Box, Stack, Typography} from "@mui/material";

function LogEntry({log}) {
    return (
        <Alert variant="outlined" severity={log.severity}
           action={
             <Typography variant={"caption"} sx={{alignSelf: "center"}}>
               {log.date.format('HH:mm:ss')}
             </Typography>
           }
        >{log.message}
          {log.error && (
            <>
              <br/>
              <Typography variant="caption">Error: {log.error}</Typography>
            </>
            )}
        </Alert>
    );
}


export default function LogsPanel({logs}) {
  if(!logs || logs.length === 0) return null

  return (
    <Box m={2}>
      <Stack spacing={1}>
        {logs.map((log, i) => <LogEntry key={i} log={log} />)}
      </Stack>
    </Box>
  )
}
