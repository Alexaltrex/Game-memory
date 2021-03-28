import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/styles";
import {headerHeight} from "../../../../utils/consts";
import {StartButton} from "./StartButton";
import {TotalTime} from "./TotalTime";
import {StepTime} from "./StepTime";

//============= CUSTOM HOOK =============
const useGameHeader = () => {
    const classes = useStyles();

    return {
        classes
    }
};

//============== COMPONENT ==================
export const GameHeader: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useGameHeader();

    return (
        <>
            <header className={classes.gameHeader}>
                <div className={classes.leftBlock}>
                    <TotalTime/>
                    <StepTime/>
                </div>
                <div className={classes.rightBlock}>
                    <StartButton/>
                </div>

            </header>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
) =>
    createStyles({
        gameHeader: {
            height: headerHeight,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            boxSizing: 'border-box',

        },
        leftBlock: {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
        },
        rightBlock: {

        }
    }));