import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
//import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";

import ExtensionIcon from '@material-ui/icons/Extension';

import {Typography} from "@material-ui/core";

//============= CUSTOM HOOK =============
const useRulesItem = () => {
    const classes = useStyles();

    return {
        classes
    }
};

//============== COMPONENT ==================
export const RulesItem: React.FC<{ primary: string }> = ({primary}): ReactElement => {
    const {
        classes
    } = useRulesItem();

    return (
        <div className={classes.listItem}>
            <ExtensionIcon color='secondary'
                           className={classes.icon}
            />
            <Typography>
                {primary}
            </Typography>
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
    ) =>
        createStyles({
                icon: {
                    marginRight: 10
                },
                listItem: {
                    display: 'flex',
                    marginBottom: 10
                },
            }
        )
);