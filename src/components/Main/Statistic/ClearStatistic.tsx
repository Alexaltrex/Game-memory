import React, {ReactElement} from 'react';
import {makeStyles} from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles/createStyles";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../store/selectors/app-selectors";
import {translate} from "../../../utils/lang";
import Button from "@material-ui/core/Button";
import {statisticAC} from "../../../store/reducers/statistic-reducer";
//import {Theme} from "@material-ui/core";


//============= CUSTOM HOOK =============
const useClearStatistic = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const label = translate(lang, 'Clear statistic');
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(statisticAC.clear());
    };
    return {
        classes, label, onClickHandler
    }
};

//============== COMPONENT ==================
export const ClearStatistic: React.FC<{}> = (): ReactElement => {

    const {
        classes, label, onClickHandler
    } = useClearStatistic();

    return (
            <Button className={classes.clearStatistic}
                    size='small'
                    variant='contained'
                    color='secondary'
                    startIcon={<HighlightOffIcon/>}
                    onClick={onClickHandler}
            >
                {label}
            </Button>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
) =>
    createStyles({
        clearStatistic: {

        }
    }));

