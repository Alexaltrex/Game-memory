import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {Title} from "../../common/Title";
import Card from "@material-ui/core/Card/Card";
import {HeaderOfTable} from "./HeaderOfTable";
import {StatisticItems} from "./StatisticItems";

//============= CUSTOM HOOK =============
const useStatistic = () => {
    const classes = useStyles();

    return {
        classes
    }
};

//============== COMPONENT ==================
export const Statistic: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useStatistic();

    return (
        <>
            <section className={classes.statistic}>
                <Card className={classes.card}>
                    <Title title='Statistic' marginBottom={0}/>
                    <HeaderOfTable/>
                    <StatisticItems/>
                </Card>
            </section>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statistic: {
            padding: 10,
            boxSizing: 'border-box',
            height: '100%',
            overflow: 'auto'
        },
        card: {
            padding: 10,
            boxSizing: 'border-box',
            minHeight: '100%',
            position: 'relative'
        },
    }));