import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
//import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {Title} from "../../common/Title";
import Card from "@material-ui/core/Card/Card";
import {useSelector} from "react-redux";
import {getLang} from "../../../store/selectors/app-selectors";
import {rulesEng, translate} from "../../../utils/lang";
import List from "@material-ui/core/List";
import {RulesItem} from "./RulesItem";

//============= CUSTOM HOOK =============
const useRules = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    //primary={translate(lang, rulesEng[i])}
    const rulesElements = rulesEng.map(
        (rule, i) => (
            <RulesItem primary={translate(lang, rulesEng[i])}
                       key={i}
            />
        )
    )

    return {
        classes, rulesElements
    }
};

//============== COMPONENT ==================
export const Rules: React.FC<{}> = (): ReactElement => {
    const {
        classes, rulesElements
    } = useRules();

    return (
        <section className={classes.rules}>
            <Card className={classes.card}>
                <Title title='Rules' marginBottom={0}/>
                <div className={classes.list}>
                    {rulesElements}
                </div>

            </Card>
        </section>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
) =>
    createStyles({
        rules: {
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
        list: {
            padding: 10
        },
        icon: {
            minWidth: 'inherit',
            color: 'white',
            marginRight: 10
        },
    }));