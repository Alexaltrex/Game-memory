import {ReactElement, useEffect} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/styles";
import {GameHeader} from "./GameHeader/GameHeader";
import {GameAside} from "./GameAside/GameAside";
import {GameField} from "./GameField/GameField";
import {gameAC} from "../../../store/reducers/game-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getSize} from "../../../store/selectors/game-selectors";
import {CardType} from "../../../types/type";

//============= CUSTOM HOOK =============
const useGame = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const size = useSelector(getSize);

    useEffect(() => { // инициализация при монтировании с возможно новым значением size
        const cards: Array<CardType> = [];
        for (let i = 0; i < size * size; i++) {
            cards.push({
                index: i,
                status: 'close',
                symbol: i
            })
        }
        dispatch(gameAC.setCards(cards));
    }, [dispatch, size]);

    return {
        classes
    }
};

//============== COMPONENT ==================
export const Game: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useGame();

    return (
        <section className={classes.game}>
            <GameHeader/>
            <div className={classes.innerWrapper}>
                <GameAside/>
                <GameField/>
            </div>
        </section>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
) =>
    createStyles({
        game: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        innerWrapper: {
            display: 'flex',
            flexGrow: 1
        }
    }));