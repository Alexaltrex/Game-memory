import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import brown from "@material-ui/core/colors/brown";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: brown[500],
            main: brown[700],
            dark: brown[900],
            contrastText: '#FFF'
        },
        secondary: {
            light: green[300],
            main: green[700],
            dark:  green[900],
            contrastText: '#FFF'
        },
    },
});
export default theme;