import React, {ReactElement} from 'react';
import {createStyles, makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core";
import {HeaderLogo} from "./HeaderLogo";
import {HeaderLang} from "./HeaderLang";
import {headerHeight} from "../../utils/consts";

//============= CUSTOM HOOK =============
const useHeader = () => {
    const classes = useStyles();
    return {
        classes
    }
};

//============== COMPONENT ==================
export const Header: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useHeader();

    return (
        <header className={classes.header}>
            <HeaderLogo/>
            <HeaderLang/>
        </header>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            header: {
                height: headerHeight,
                backgroundColor: theme.palette.primary.dark,
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                boxSizing: 'border-box'
            },
        }
    )
);