import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {getSidebarItem} from "../../store/selectors/app-selectors";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {appAC} from "../../store/reducers/app-reducer";
import {getIsGameStart} from "../../store/selectors/game-selectors";

//======================== CUSTOM HOOK =========================
const useSidebarItem = (ownIndex: number) => {
    const classes = useStyles();
    const sidebarItem = useSelector(getSidebarItem);
    const isGameStart = useSelector(getIsGameStart);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(appAC.setSidebarItem(ownIndex));// установить номер текущего элемнта бокового меню
    };
    const selected = ownIndex === sidebarItem;
    return {
        classes, onClickHandler, isGameStart, selected
    }
};

//======================= COMPONENT ===============================
export const SidebarItem: React.FC<PropsTypes> = (props) => {
    const {to, primary, icon, ownIndex} = props;
    const {
        classes, onClickHandler, isGameStart, selected
    } = useSidebarItem(ownIndex);

    return (
        <li>
            <ListItem
                onClick={onClickHandler}
                className={classes.listItem}
                classes={{
                    selected: classes.selected
                }}
                selected={selected}
                button
                component={RouterLink}
                to={to}
                disabled={isGameStart}
            >
                {
                    icon
                        ? <ListItemIcon className={clsx(selected && classes.iconSelected, classes.icon)}>
                            {icon}
                        </ListItemIcon>
                        : null
                }
                <ListItemText primary={primary} className={clsx(selected && classes.textSelected, classes.text)}/>
            </ListItem>
        </li>
    )
};

//============================== TYPES ==================================
type PropsTypes = {
    to: string
    primary: string
    icon?: React.ReactElement
    ownIndex: number
}

//============================== STYLES ===================================
const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        minWidth: 'inherit',
        color: 'white',
        marginRight: 10
    },
    iconSelected: {
        color: theme.palette.secondary.dark
    },
    text: {
        color: 'white'
    },
    textSelected: {
        color: theme.palette.secondary.dark,
        fontWeight: 900
    },
    listItem: {
        padding: '5px 5px 5px 10px',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: blueGrey[100],
            '& span': {
                color: theme.palette.primary.dark
            },
            '& svg': {
                color: theme.palette.primary.dark
            }
        },
        '&$selected': {
            backgroundColor: blueGrey[100],
            '&:hover': {
                backgroundColor: blueGrey[100],
                '& span': {
                    color: theme.palette.secondary.dark
                },
                '& svg': {
                    color: theme.palette.secondary.dark
                }
            }
        }
    },
    selected: {}
}));