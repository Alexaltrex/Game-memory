import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import {Title} from "../common/Title";
import Typography from "@material-ui/core/Typography";
import {getLang} from "../../store/selectors/app-selectors";
import {useDispatch, useSelector} from "react-redux";
import {translate} from "../../utils/lang";
import Slider from "@material-ui/core/Slider";
import {getSize} from "../../store/selectors/game-selectors";
import {gameAC} from "../../store/reducers/game-reducer";
import {sizeMax, sizeMin} from "../../utils/consts";

//============= CUSTOM HOOK =============
const useSettings = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const size = useSelector(getSize);
    const dispatch = useDispatch();
    const settingLabel = translate(lang, 'Size of game field');
    const onChangeHandler = (e: any, value: number | number[]) => { //React.ChangeEvent<HTMLInputElement>
        dispatch(gameAC.setSize(value as number));
    };

    const marks: Array<{ value: number, label: String }> = [];
    for (let i = sizeMin; i <= sizeMax; i = i + 2) {
        marks.push({
            value: i,
            label: String(i),
        });
    }

    return {
        classes, settingLabel, onChangeHandler, size, marks
    }
};

//============== COMPONENT ==================
export const Settings: React.FC<{}> = (): ReactElement => {
    const {
        classes, settingLabel, onChangeHandler, size, marks
    } = useSettings();

    return (
        <>
            <section className={classes.settings}>

                <Card className={classes.card}>
                    <Title title='Settings' marginBottom={0}/>
                    <div className={classes.typographyBlock}>
                        <Typography>
                            {`${settingLabel}: `}
                        </Typography>
                        <Typography className={classes.typography}>
                            {`${size} x ${size}`}
                        </Typography>
                    </div>


                    <Slider
                        defaultValue={size}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={2}
                        marks={marks}
                        min={sizeMin}
                        max={sizeMax}
                        onChange={onChangeHandler}
                        className={classes.slider}
                    />
                </Card>
            </section>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        settings: {
            padding: 10,
            boxSizing: 'border-box',
            height: '100%',
            overflow: 'auto'
        },
        card: {
            padding: 10,
            boxSizing: 'border-box',
            minHeight: '100%',
            position: 'relative'
        },
        typographyBlock: {
            display: 'flex',
            alignItems: 'center',
            margin: 20
        },
        typography: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            padding: '5px 10px ',
            borderRadius: 10,
            marginLeft: 5
        },
        slider: {
            margin: '20px 30px 0',
            maxWidth: (sizeMax - sizeMin) * 50,

        }
    }));