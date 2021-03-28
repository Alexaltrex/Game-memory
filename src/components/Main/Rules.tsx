import {ReactElement} from "react";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
//import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";
import {Title} from "../common/Title";
import Card from "@material-ui/core/Card/Card";
import {useSelector} from "react-redux";
import {getLang} from "../../store/selectors/app-selectors";
import {rulesEng, translate} from "../../utils/lang";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

//============= CUSTOM HOOK =============
const useRules = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const rulesElements = rulesEng.map((rule, i) => (
            <ListItem>
                <ListItemIcon>
                    <FiberManualRecordIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={translate(lang, rulesEng[i])} />
            </ListItem>
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
        <>
            <section className={classes.rules}>
                <Card className={classes.card}>
                    <Title title='Rules' marginBottom={0}/>
                    <List>
                        {rulesElements}
                    </List>

                </Card>
            </section>
        </>
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
        },
    }));