import React, {ReactElement} from 'react';
import {createStyles, makeStyles} from "@material-ui/styles";
import {Theme, Typography} from "@material-ui/core";
import ExtensionIcon from '@material-ui/icons/Extension';
import Link from "@material-ui/core/Link";
import {useSelector} from "react-redux";
import {getLang} from "../../store/selectors/app-selectors";
import {translate} from "../../utils/lang";

//============= CUSTOM HOOK =============
const useHeader = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const logo = translate(lang, 'Game Memory');
    return {
        classes, logo
    }
};

//============== COMPONENT ==================
export const HeaderLogo: React.FC<{}> = (): ReactElement => {
    const {
        classes, logo
    } = useHeader();

    return (
        <Link className={classes.headerLogo}
              href='/'
              underline='none'
        >
            <ExtensionIcon fontSize='large'
                           color='secondary'
                           className={classes.icon}
            />
            <Typography variant='h5'
                        className={classes.title}
            >
                {logo}
            </Typography>
        </Link>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerLogo: {
            display: 'flex',
            alignItems: 'center',
            '& h5': {
                transition: '0.5s',
            },
            '&:hover h5': {
                textShadow: '0px 0px 20px #FFF'
            },
        },
        icon: {
            color: theme.palette.common.white,
            marginRight: 10
        },
        title: {
            color: theme.palette.common.white
        }
    }));