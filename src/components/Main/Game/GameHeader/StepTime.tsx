import {ReactElement, useEffect, useState} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../store/selectors/app-selectors";
import {translate} from "../../../../utils/lang";
import Typography from "@material-ui/core/Typography";
import {
    getCards, getClickCount,
    getFirstCardIndex,
    getIsStepStart, getOpenCardCount,
    getSecondCardIndex, getSecs, getSize,
    getStepSecs
} from "../../../../store/selectors/game-selectors";
import {getSeconds} from "../../../../utils/getTime";
import {gameAC} from "../../../../store/reducers/game-reducer";
import {animCloseDuration, animOpenDuration, stepTime} from "../../../../utils/consts";
import {statisticAC} from "../../../../store/reducers/statistic-reducer";
import {appAC} from "../../../../store/reducers/app-reducer";

//============= CUSTOM HOOK =============
const useTotalTime = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const label = translate(lang, 'Step time');
    const stepSecs = useSelector(getStepSecs);
    const isStepStart = useSelector(getIsStepStart);
    const firstCardIndex = useSelector(getFirstCardIndex);
    const secondCardIndex = useSelector(getSecondCardIndex);
    const cards = useSelector(getCards);
    const openCardCount = useSelector(getOpenCardCount);
    const size = useSelector(getSize);
    const secs = useSelector(getSecs);
    const clickCount = useSelector(getClickCount);

    useEffect(() => { // анализ числа открытых карточек
        if (openCardCount === size * size) { // все открыты - победа
            dispatch(gameAC.setIsGameStart(false)); // останавливаем таймер
            dispatch(statisticAC.addStatisticItem({
                id: 0,
                secs,
                size,
                clickCount
            })); // добавление статистики
            dispatch(appAC.setAlert({
                isShow: true,
                message: translate(lang, 'You win!'),
                severity: 'success'
            }))
            dispatch(gameAC.setClickCount(0));
            dispatch(gameAC.setOpenCardCount(0));
        }

    }, [openCardCount, size]);

    useEffect(() => { // анализ открытых карточек
        if ( // если выбрана первая и вторая карточки и таймер не дошел до конца
            firstCardIndex !== null
            && secondCardIndex !== null
            && isStepStart
        ) {
            // блокировка
            dispatch(gameAC.setIsBlock(true)); // заблокировали
            setTimeout(() => {
                dispatch(gameAC.setIsBlock(false)); // разблокировали через время анимации
            }, animOpenDuration + animCloseDuration);

            if (cards[firstCardIndex].symbol === cards[secondCardIndex].symbol) { // карточки совпадают
                dispatch(gameAC.addSymbol(cards[firstCardIndex].symbol));
                dispatch(gameAC.setFirstCardIndex(null));
                dispatch(gameAC.setSecondCardIndex(null));
                dispatch(gameAC.setOpenCardCount(openCardCount + 2));

                setTimeout(() => {
                    dispatch(gameAC.setCardStatus(firstCardIndex, 'end'));
                    dispatch(gameAC.setCardStatus(secondCardIndex, 'end'));

                }, animOpenDuration)
            } else { // карточки не совпадают
                setTimeout(() => {
                    dispatch(gameAC.setCardStatus(firstCardIndex, 'close'));
                    dispatch(gameAC.setCardStatus(secondCardIndex, 'close'));
                    dispatch(gameAC.setFirstCardIndex(null));
                    dispatch(gameAC.setSecondCardIndex(null));
                }, animOpenDuration)
            }
            dispatch(gameAC.setIsStepStart(false)); // остановка таймера
            dispatch(gameAC.setStepSecs(0)); // сбрасываем до первоначального значения
        }
    }, [firstCardIndex, secondCardIndex, dispatch]);

    const [timer, setTimer] = useState(0);
    useEffect(() => { // алгоритм работы таймера
        let timerID: number;
        if (isStepStart) { // если таймер запущен
            if (stepSecs !== 0) { // если еще не дошел до конца
                timerID = window.setTimeout(() => {
                    dispatch(gameAC.setStepSecs(stepSecs - 1));
                }, 1000);
                setTimer(timerID);
            } else { // если дошел до конца
                // @ts-ignore
                //clearInterval(timerID); // очищаем
                dispatch(gameAC.setIsStepStart(false));
                dispatch(gameAC.setStepSecs(stepTime)); // сбрасываем до первоначального значения
                if (firstCardIndex !== null) { // если первая открыта
                    dispatch(gameAC.setCardStatus(firstCardIndex, 'close'));
                    dispatch(gameAC.setFirstCardIndex(null));
                }
                if (secondCardIndex !== null) { // если вторая открыта
                    dispatch(gameAC.setCardStatus(secondCardIndex, 'close'));
                    dispatch(gameAC.setSecondCardIndex(null));
                }
            }

        } else if (!isStepStart && stepSecs !== stepTime) { // при монтировании чистить не надо - его еще нет
            clearTimeout(timer);
            dispatch(gameAC.setStepSecs(stepTime)); // сбрасываем до первоначального значения
        }
        return () => {
            clearTimeout(timerID);
        }
    }, [isStepStart, stepSecs, dispatch, ]);
    const time = getSeconds(stepSecs);
    return {
        classes, label, time
    }
};

//============== COMPONENT ==================
export const StepTime: React.FC<{}> = (): ReactElement => {
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
            alignItems: 'center'
        },
        time: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            padding: '2px 15px',
            borderRadius: 14,
            marginRight: 10
        }

    }));