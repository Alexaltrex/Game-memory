import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {useSelector} from "react-redux";
import {getSortMode, getSortValue, getStatistic} from "../../../store/selectors/statistic-selectors";
import {StatisticItem} from "./StatisticItem";
import {sortStatisticItems} from "../../../utils/sortStatisticItems";


//============= CUSTOM HOOK =============
const useStatisticItems = () => {
    const classes = useStyles();
    const statisticItems = useSelector(getStatistic);
    const sortMode = useSelector(getSortMode);
    const sortValue = useSelector(getSortValue);
    const statisticItemsElements = statisticItems
        .sort(sortStatisticItems(sortMode, sortValue))
        .map(
            item => <StatisticItem key={item.id} item={item}/>
            );
    return {
        classes, statisticItemsElements
    }
};

//============== COMPONENT ==================
export const StatisticItems: React.FC<{}> = (): ReactElement => {
    const {
        classes, statisticItemsElements
    } = useStatisticItems();

    return (
        <div className={classes.statisticItems}>
            {statisticItemsElements}
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        statisticItems: {},
    }));