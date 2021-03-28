import {ReactElement, useEffect, useState} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../store/selectors/app-selectors";
import {translate} from "../../../../utils/lang";
import Typography from "@material-ui/core/Typography";
import {getIsGameStart, getSecs} from "../../../../store/selectors/game-selectors";
import {getTime} from "../../../../utils/getTime";
import {gameAC} from "../../../../store/reducers/game-reducer";

//============= CUSTOM HOOK =============
const useTotalTime = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const label = translate(lang, 'Total time');
    const secs = useSelector(getSecs);
    const isGameStart = useSelector(getIsGameStart);

    const [timer, setTimer] = useState(0);

    useEffect(() => { // алгоритм работы таймера
        let timerID: number;
        if (isGameStart) { // дана команда на запуск таймера
            timerID = window.setTimeout(() => { // запускаем таймер
                dispatch(gameAC.setSecs(secs + 1));
            }, 1000);
            setTimer(timerID);
        } else if (!isGameStart && timer) { // дана команда на остановку таймера
            clearTimeout(timer);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [isGameStart, secs]);

    useEffect(() => { // устанавливаем в первоначальное значение в начеле игры
        if (isGameStart) {
            dispatch(gameAC.setSecs(0));
        }
    }, [isGameStart, dispatch]);


    const time = getTime(secs);
    return {
        classes, label, time
    }
};

//============== COMPONENT ==================
export const TotalTime: React.FC<{}> = (): ReactElement => {
    const {
        classes, label, time
    } = useTotalTime();

    return (
        <div className={classes.totalTime}>
            <Typography className={classes.time}>
                {time}
            </Typography>

            <Typography color='primary'>
                {label}
            </Typography>
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        totalTime: {
            display: 'flex',
            alignItems: 'center',
            marginRight: 20

        },
        time: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            padding: '2px 15px',
            borderRadius: 14,
            marginRight: 10
        }

    }));