import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {useSelector} from "react-redux";
import {translate} from "../../../utils/lang";
import {getLang} from "../../../store/selectors/app-selectors";

//============= CUSTOM HOOK =============
const useHeaderOfTable = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const sizeLabel = translate(lang, 'Size of game field')
    const timeLabel = translate(lang, 'Total time');
    const countLabel = translate(lang, 'Count of opened cards');
    return {
        classes, sizeLabel, timeLabel, countLabel
    }
};

//============== COMPONENT ==================
export const HeaderOfTable: React.FC<{}> = (): ReactElement => {
    const {
        classes, sizeLabel, timeLabel, countLabel
    } = useHeaderOfTable();

    return (

        <div className={classes.headerOfTable}>
            <Typography align='center'
                        color='secondary'
            >
                #
            </Typography>
            <Typography align='center'
                        color='secondary'
            >
                {timeLabel}
            </Typography>
            <Typography align='center'
                        color='secondary'
            >
                {sizeLabel}
            </Typography>
            <Typography align='center'
                        color='secondary'
            >
                {countLabel}
            </Typography>
        </div>

    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerOfTable: {
            margin: 10,
            display: 'grid',
            gridTemplateColumns: '30px 1fr 1fr 1fr'
        },
    }));