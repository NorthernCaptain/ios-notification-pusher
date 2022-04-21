import React from 'react'
import { render } from 'react-dom'

import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from './theme';
import './assets/css/fonts.css'

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

// Now we can render our application into it
render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root'))
