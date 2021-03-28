import React, {ReactElement} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Theme, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popover from "@material-ui/core/Popover/Popover";
import createStyles from "@material-ui/styles/createStyles/createStyles";
import CheckIcon from '@material-ui/icons/Check';
import Divider from "@material-ui/core/Divider";
import {getSortMode, getSortValue} from "../../../store/selectors/statistic-selectors";
import {SortModeType, SortValueType} from "../../../types/type";
import {statisticAC} from "../../../store/reducers/statistic-reducer";
import {getLang} from "../../../store/selectors/app-selectors";
import {translate} from "../../../utils/lang";

//============= CUSTOM HOOK =============
const useSortButton = () => {
    const classes = useStyles();
    const sortMode = useSelector(getSortMode);
    const sortValue = useSelector(getSortValue);
    const lang = useSelector(getLang)
    const dispatch = useDispatch();

    const sortModeLabels = {
        'id': translate(lang, 'By order'),
        'secs': translate(lang, 'By time'),
        'size': translate(lang, 'By size'),
        'clickCount': translate(lang, 'By count of opened cards')
    };
    const sortValueLabels = {
        'increment': translate(lang, 'By increment'),
        'decrement': translate(lang, 'By decrement')
    };
    const sortModeLabel = sortModeLabels[sortMode];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const onCloseHandler = () => {
        setAnchorEl(null);
    };

    const sortModeListItemElements = Object
        .keys(sortModeLabels)
        .map(
            key => {
                const onSelectSortMode = () => {
                    dispatch(statisticAC.setSortMode(key as SortModeType));
                };
                return (
                    <ListItem key={key}
                              className={classes.listItem}
                              onClick={onSelectSortMode}
                              button
                    >
                        {
                            key === sortMode &&
                            <CheckIcon className={classes.listItemIcon}/>
                        }
                        {/*@ts-ignore*/}
                        <Typography variant='body2'>{sortModeLabels[key]}</Typography>
                    </ListItem>
                )
            }
        );

    const sortValueListItemElements = Object
        .keys(sortValueLabels)
        .map(
            key => {
                const onSelectSortValue = () => {
                    dispatch(statisticAC.setSortValue(key as SortValueType));
                };
                return (
                    <ListItem key={key}
                              className={classes.listItem}
                              onClick={onSelectSortValue}
                              button
                    >
                        {
                            key === sortValue &&
                            <CheckIcon className={classes.listItemIcon}/>
                        }
                        {/*@ts-ignore*/}
                        <Typography variant='body2'>{sortValueLabels[key]}</Typography>
                    </ListItem>
                )
            }
        );


    return {
        classes, anchorEl, onClickHandler, onCloseHandler,
        sortModeLabel,
        sortModeListItemElements, sortValueListItemElements
    }
};

//============== COMPONENT ==================
export const SortButton: React.FC<{}> = (): ReactElement => {
    const {
        classes, anchorEl, onClickHandler, onCloseHandler,
        sortModeLabel,
        sortModeListItemElements, sortValueListItemElements
    } = useSortButton();

    return (
        <div className={classes.sortButton}>
            <Button
                className={classes.button}
                startIcon={<SortIcon fontSize='large'/>
                }
                endIcon={<ExpandMoreIcon/>}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={onClickHandler}
            >
                {sortModeLabel}
            </Button>

            <Popover
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={onCloseHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List className={classes.list}>
                    {sortModeListItemElements}
                </List>
                <Divider/>
                <List className={classes.list}>
                    {sortValueListItemElements}
                </List>
            </Popover>
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles(
        {
            sortButton: {
                marginRight: 20
            },
            list: {
                padding: 0
            },
            button: {
                textTransform: 'none',
                //width: 200,
                '& .MuiButton-label': {
                    //backgroundColor: 'red',
                    //width: 140
                }
            },
            listItem: {
                padding: '5px 15px 5px 30px',
                position: 'relative',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white
                }
            },
            listItemIcon: {
                position: 'absolute',
                top: '50%',
                left: 5,
                transform: 'translate(0%, -50%)'
            }
        })
);