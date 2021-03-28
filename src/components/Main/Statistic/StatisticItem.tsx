import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {StatisticItemType} from "../../../types/type";
import Typography from "@material-ui/core/Typography";
import {getTime} from "../../../utils/getTime";


//============= CUSTOM HOOK =============
const useStatisticItem = () => {
    const classes = useStyles();


    return {
        classes
    }
};

//============== COMPONENT ==================
export const StatisticItem: React.FC<{item: StatisticItemType}> = ({item}): ReactElement => {
    const {
        classes
    } = useStatisticItem();

    return (
        <div className={classes.statisticItem}>
            <Typography align='center'>
                {item.id}
            </Typography>
            <Typography align='center'>
                {getTime(item.secs)}
            </Typography>
            <Typography align='center'>
                {`${item.size} x ${item.size}`}
            </Typography>
            <Typography align='center'>
                {item.clickCount}
            </Typography>
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statisticItem: {
            margin: 10,
            display: 'grid',
            gridTemplateColumns: '30px 1fr 1fr 1fr'
        },
    }));