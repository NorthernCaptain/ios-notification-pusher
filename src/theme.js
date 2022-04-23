import { red, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#039be5',
            contrastText: '#ffffff',
        },
        secondary: orange,
        paper2: {
            main: '#333333',
            contrastText: '#fcfcfa',
        },
    },
    error: {
        main: red.A400,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                enableColorOnDark: false,
            },
        },
    }
});

export default theme;
