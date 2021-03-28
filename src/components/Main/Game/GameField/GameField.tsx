import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/styles";
import {useSelector} from "react-redux";
import {getCards, getSize} from "../../../../store/selectors/game-selectors";
import {CardItem} from "./CardItem";


//============= CUSTOM HOOK =============
const useGameField = () => {
    const size = useSelector(getSize);
    const props = {
        size
    };
    const classes = useStyles(props);
    const cards = useSelector(getCards);
    const cardElements = cards.map(card => <CardItem key={card.index} card={card}/>)
    return {
        classes, cardElements
    }
};

//============== COMPONENT ==================
export const GameField: React.FC<{}> = (): ReactElement => {
    const {
        classes, cardElements
    } = useGameField();

    return (
        <>
            <div className={classes.gameField}>
                <div className={classes.items}>
                    {cardElements}
                </div>

            </div>
        </>
    );
};

//============================ TYPE =======================
type StylePropsType = {
    size: number
}

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
    ) =>
    createStyles({
        gameField: {
            flexGrow: 1,
            //backgroundColor: 'green',//theme.palette.primary.main,
            height: '100%',
            padding: 10,
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center'

        },
        items: (props: StylePropsType) =>( {
            display: 'grid',
            gridTemplateColumns: `repeat(${props.size}, minmax(30px, 60px))`,
            gridTemplateRows: `repeat(${props.size}, minmax(30px, 60px))`,

        })
    }
    )
);