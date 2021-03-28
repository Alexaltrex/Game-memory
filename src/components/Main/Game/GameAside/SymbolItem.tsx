import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import {icons} from "../../../../utils/icons";

//============= CUSTOM HOOK =============
const useSymbolItem = (symbol: number) => {
    const classes = useStyles();
    const icon = icons[symbol];
    return {
        classes, icon
    }
};

//============== COMPONENT ==================
export const SymbolItem: React.FC<{ symbol: number }> = ({symbol}): ReactElement => {
    const {
        classes, icon
    } = useSymbolItem(symbol);

    return (
        <>
            <div className={classes.symbolItem}>

                <div className={classes.card}>
                    <Icon className={classes.icon}>
                        {icon}
                    </Icon>
                </div>
                <div className={classes.card}>
                    <Icon className={classes.icon}>
                        {icon}
                    </Icon>
                </div>

            </div>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            symbolItem: {
                display: 'flex'
            },
            card:         {
                backgroundColor: theme.palette.secondary.dark,
                borderRadius: 5,
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5,
                marginBottom: 5
            },
            icon: {
                fontSize: '25px',
                color: theme.palette.common.white
            }
        }
    )
);

