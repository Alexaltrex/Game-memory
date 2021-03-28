import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {CardType, StatusType} from "../../../../types/type";
import {useDispatch, useSelector} from "react-redux";
import {
    getClickCount,
    getIsBlock,
    getIsGameStart,
    getIsStepStart,
    getSize
} from "../../../../store/selectors/game-selectors";
import Zoom from "@material-ui/core/Zoom";
import {gameAC} from "../../../../store/reducers/game-reducer";
import Icon from "@material-ui/core/Icon";
import {icons} from "../../../../utils/icons";
import {animCloseDuration, animOpenDuration} from "../../../../utils/consts";

//============= CUSTOM HOOK =============
const useCardItem = (card: CardType) => {
    const dispatch = useDispatch();
    const size = useSelector(getSize);
    const isGameStart = useSelector(getIsGameStart);
    const isStepStart = useSelector(getIsStepStart);
    const clickCount = useSelector(getClickCount);
    const isBlock = useSelector(getIsBlock);

    const props = {
        size,
        isGameStart,
        status: card.status
    };
    const classes = useStyles(props);

    const onClickHandler = () => {
        if (isGameStart && card.status === 'close' && !isBlock) { // игра запущена, нажали по закрытой карточке
            if (!isStepStart) { // выбрана первая карточка
                dispatch(gameAC.setIsStepStart(true)); // это запустит обратный таймер хода
                dispatch(gameAC.setFirstCardIndex(card.index)); // установить индекс первой в паре выбранной карточки
                dispatch(gameAC.setCardStatus(card.index, 'open')) // изменить статус первой карточки
            } else { // выбрана вторая карточка
                dispatch(gameAC.setSecondCardIndex(card.index)); // установить индекс второй в паре выбранной карточки
                dispatch(gameAC.setCardStatus(card.index, 'open')) // изменить статус второй карточки
            }
            dispatch(gameAC.setClickCount(clickCount + 1));
        }
    };
    const icon = icons[card.symbol];
    const timeout = card.status === 'open' ? animOpenDuration : animCloseDuration;

    return {
        classes, onClickHandler, icon, timeout
    }
};

//============== COMPONENT ==================
export const CardItem: React.FC<{ card: CardType }> = ({card}): ReactElement => {
    const {
        classes, onClickHandler, icon, timeout
    } = useCardItem(card);

    return (
        <>
            <div className={classes.cardItem}
                 onClick={onClickHandler}
            >
                <Zoom in={card.status === 'open' || card.status === 'end'}
                      timeout={timeout}
                >
                    <div className={classes.cardOpen}>
                        <Icon className={classes.icon}>
                            {icon}
                        </Icon>
                    </div>
                </Zoom>
                <Zoom in={card.status === 'close'}
                      timeout={timeout}
                >
                    <div className={classes.cardClose}>
                        <Icon className={classes.icon}>
                            help_outline
                        </Icon>
                    </div>
                </Zoom>
            </div>
        </>
    );
};

//============================ TYPE =======================
type StylePropsType = {
    size: number
    isGameStart: boolean
    status: StatusType
}

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardItem: (props: StylePropsType) => ({
            margin: 2,
            borderRadius: 10,
            cursor: props.isGameStart && props.status !== 'end' ? 'pointer' : 'auto',
            position: 'relative'
        }),
        cardClose: (props: StylePropsType) => ({
            backgroundColor: props.isGameStart ? theme.palette.primary.main : theme.palette.grey.A200,
            borderRadius: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '0.5s',
            '&:hover': {
                backgroundColor: props.isGameStart ? theme.palette.primary.light : theme.palette.grey.A200,
            }
        }),
        cardOpen: ({status}) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: status === 'open'
                ? theme.palette.secondary.dark
                : status === 'end'
                    ? theme.palette.grey.A200
                    : theme.palette.secondary.dark,
            borderRadius: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }),
        icon: {
            fontSize: '50px',
            color: theme.palette.common.white
        }

    }));

