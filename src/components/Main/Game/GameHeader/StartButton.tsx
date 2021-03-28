import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getLang} from "../../../../store/selectors/app-selectors";
import {translate} from "../../../../utils/lang";
import {gameAC} from "../../../../store/reducers/game-reducer";
import {getIsGameStart, getSize} from "../../../../store/selectors/game-selectors";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import {createRandomArray} from "../../../../utils/createRandomArray";
import {CardType} from "../../../../types/type";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";

//============= CUSTOM HOOK =============
const useStartButton = () => {

    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const isGameStart = useSelector(getIsGameStart);
    const size = useSelector(getSize);
    const label = isGameStart ? translate(lang, 'Stop') : translate(lang, 'Start');

    const onClickHandler = () => {
        dispatch(gameAC.clearArrayOfEndedSymbols());
        if (!isGameStart) { // start
            const symbols = createRandomArray(size * size);
            const cards: Array<CardType> = [];
            for (let i = 0; i < size * size; i++) {
                cards.push({
                    index: i,
                    status: 'close',
                    symbol: symbols[i]
                })
            }
            dispatch(gameAC.setCards(cards));
            dispatch(gameAC.setIsGameStart(!isGameStart));
        } else if (isGameStart) { // stop
            dispatch(gameAC.setIsGameStart(!isGameStart));
            dispatch(gameAC.setSecs(0));
            dispatch(gameAC.setClickCount(0));
            dispatch(gameAC.setOpenCardCount(0));
        }

    };
    const icon = isGameStart ? <StopIcon/> : <PlayArrowIcon/>;
    const classes = useStyles({isGameStart});
    return {
        classes, label, onClickHandler, icon
    }
};

//============== COMPONENT ==================
export const StartButton: React.FC<{}> = (): ReactElement => {
    const {
        classes, label, onClickHandler, icon
    } = useStartButton();

    return (
        <>
            <Button className={classes.startButton}
                    onClick={onClickHandler}
                    variant='contained'
                    startIcon={icon}

            >
                {label}
            </Button>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        startButton: ({isGameStart}: {isGameStart: boolean}) => ({
            borderRadius: 18,
            color: theme.palette.common.white,
            backgroundColor: !isGameStart ? theme.palette.secondary.main : red[700],
            '&:hover': {
                backgroundColor: !isGameStart ? green[600] : red[600],
            }
        }),
    }));