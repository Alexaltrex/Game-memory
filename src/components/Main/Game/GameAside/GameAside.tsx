import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/styles";
import {useSelector} from "react-redux";
import {getArrayOfEndedSymbols} from "../../../../store/selectors/game-selectors";
import {SymbolItem} from "./SymbolItem";

//============= CUSTOM HOOK =============
const useGameAside = () => {
    const classes = useStyles();
    const arrayOfEndedSymbols = useSelector(getArrayOfEndedSymbols);
    const symbolElements = arrayOfEndedSymbols.map((symbol, i) => <SymbolItem key={i} symbol={symbol}/>)

    return {
        classes, symbolElements
    }
};

//============== COMPONENT ==================
export const GameAside: React.FC<{}> = (): ReactElement => {
    const {
        classes, symbolElements
    } = useGameAside();

    return (
        <>
            <div className={classes.gameAside}>
                {symbolElements}
            </div>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
    ) =>
    createStyles({
            gameAside: {
                flex: '0 0 100px',
                height: '100%',
                padding: 10,
                boxSizing: 'border-box',

            },
        }
    )
);