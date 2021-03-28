import Button from "@material-ui/core/Button";
import React, {ReactElement} from "react";
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {translate} from "../../utils/lang";
import {appAC} from "../../store/reducers/app-reducer";
import {getLang} from "../../store/selectors/app-selectors";
import createStyles from "@material-ui/styles/createStyles/createStyles";


//================= CUSTOM HOOK =========================
const useHeaderLang = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const SelectRusHandler = () => {
        dispatch(appAC.setLang('rus'));
        setAnchorEl(null);
    };
    const SelectEngHandler = () => {
        dispatch(appAC.setLang('eng'));
        setAnchorEl(null);
    };
    const title = translate(lang, 'Change language');
    const englishLabel = translate(lang, 'English')
    return {
        classes, lang, anchorEl, title, englishLabel,
        handleClick, handleClose, SelectEngHandler,
        SelectRusHandler
    }
}

//======================= COMPONENT ===============================
export const HeaderLang: React.FC<{}> = (): ReactElement => {
    const {
        classes, lang, anchorEl, title, englishLabel,
        handleClick, handleClose, SelectEngHandler,
        SelectRusHandler
    } = useHeaderLang();

    return (
        <>
            <Tooltip title={title} placement="bottom-start">
                <Button
                    className={classes.button}
                    startIcon={<LanguageIcon/>}
                    endIcon={<ExpandMoreIcon/>}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {englishLabel}
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
            >
                <MenuItem onClick={SelectEngHandler}
                          selected={lang === 'eng'}
                          classes={{
                              selected: classes.selected
                          }}
                          className={classes.menuItem}
                >
                    English
                </MenuItem>
                <MenuItem onClick={SelectRusHandler}
                          selected={lang === 'rus'}
                          classes={{
                              selected: classes.selected
                          }}
                          className={classes.menuItem}
                >
                    Русский
                </MenuItem>
            </Menu>
        </>
    )
};

//================================ STYLES =======================================
const useStyles = makeStyles((
    //theme: Theme
) =>
    createStyles({
        button: {
            color: 'white',
            marginRight: 10,
            textTransform: 'none'
        },
        menu: {
            padding: 0
        },
        menuItem: {
            '&:hover': {
                //backgroundColor: theme.palette.grey.A200
            },
            '&$selected': {
                //backgroundColor: theme.palette.grey.A100
            }
        },
        selected: {}
    }));