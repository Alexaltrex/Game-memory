import React, {ReactElement} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Switch, Route} from 'react-router-dom';
//import {Theme} from "@material-ui/core";
import createStyles from "@material-ui/styles/createStyles/createStyles";
import {Game} from "./Game/Game";
import {Rules} from "./Rules";
import {Settings} from "./Settings";
import {Statistic} from "./Statistic/Statistic";
import {PageNotFound} from "../common/PageNotFound";
import brown from "@material-ui/core/colors/brown";
import AlertCustom from "../common/AlertCustom";

//============= CUSTOM HOOK =============
const useMain = () => {
    const classes = useStyles();
    return {
        classes
    }
};

//============== COMPONENT ==================
export const Main: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useMain();

    return (
        <main className={classes.main}>
            <Switch>
                <Route exact path='/' component={Game}/>
                <Route exact path='/rules' component={Rules}/>
                <Route exact path='/settings' component={Settings}/>
                <Route exact path='/statistic' component={Statistic}/>
                <Route exact path='*' component={PageNotFound}/>
            </Switch>
            <AlertCustom/>
        </main>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
    ) =>
    createStyles({
            main: {
                position: 'relative',
                flex: '1 1 auto',
                backgroundColor: brown[100],
                height: '100%',
                boxSizing: 'border-box',
                //padding: 10,
                overflow: 'auto'
            },
        }
    )
);