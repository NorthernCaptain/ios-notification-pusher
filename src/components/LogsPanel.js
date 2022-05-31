import * as React from 'react';
import {Alert, Box, Stack, Typography} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';

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
  if(!logs || logs.length === 0) return (
    <Stack m={2} sx={{height: "calc(100vh - 32px)"}} justifyContent="center">
      <Stack spacing={1} alignItems="center">
        <ArticleIcon fontSize="large" color="disabled"/>
        <Typography variant="h6" color="disabled">Logs will be here</Typography>
      </Stack>
    </Stack>
  )

  return (
    <Box m={2}>
      <Stack spacing={1}>
        {logs.map((log, i) => <LogEntry key={i} log={log} />)}
      </Stack>
    </Box>
  )
}
