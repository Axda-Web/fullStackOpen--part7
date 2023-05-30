import { createTheme } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';

const theme = createTheme({
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        allVariants: {
            color: grey[800],
        },
    },
});

export default theme;
