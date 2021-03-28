import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ExtensionIcon from '@material-ui/icons/Extension';
import GavelIcon from '@material-ui/icons/Gavel';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import {useSelector} from 'react-redux';
import {getLang} from "../../store/selectors/app-selectors";
import {Lang} from "../../utils/lang";
import {createStyles} from "@material-ui/styles";
import {SidebarItem} from "./SidebarItem";
import {sidebarWidth} from "../../utils/consts";

//======================== CUSTOM HOOK =========================
const useSidebar = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const primaries = [
        lang === 'rus' ? Lang['Game'].rus : Lang['Game'].eng,
        lang === 'rus' ? Lang['Rules'].rus : Lang['Rules'].eng,
        lang === 'rus' ? Lang['Settings'].rus : Lang['Settings'].eng,
        lang === 'rus' ? Lang['Statistic'].rus : Lang['Statistic'].eng,
    ];
    const links = [
        "/",
        "/rules",
        "/settings",
        "/statistic",
    ];
    const icons = [
        <ExtensionIcon/>,
        <GavelIcon/>,
        <SettingsIcon/>,
        <EqualizerIcon/>
    ];
    const SidebarItemElements = links.map(
        (link, i) => <SidebarItem ownIndex={i + 1}
                                  key={link}
                                  to={link}
                                  primary={primaries[i]}
                                  icon={icons[i]}/>
    );
    return {
        classes, SidebarItemElements
    }
};

//======================= COMPONENT ===============================
export const Sidebar: React.FC = () => {
    const {
        classes, SidebarItemElements
    } = useSidebar();

    return (
        <aside className={classes.sidebar}>
            <List className={classes.list}>
                {SidebarItemElements}
            </List>
        </aside>

    );
};


//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebar: {
            flex: `0 0 ${sidebarWidth}px`,
            backgroundColor: theme.palette.primary.main,
            height: '100%',
            paddingTop: 0,
            boxSizing: 'border-box',
        },
        list: {
            padding: 0
        }
    }));