import React, {ReactElement} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Divider, Theme, Typography} from "@material-ui/core";
import createStyles from "@material-ui/styles/createStyles/createStyles";
import {Variant} from "@material-ui/core/styles/createTypography";
import {getLang} from "../../store/selectors/app-selectors";
import {translate} from "../../utils/lang";
import {useSelector} from "react-redux";

//============= CUSTOM HOOK =============
const useTitle = (
    marginBottom: number,
    marginLeft: number,
    color: string | undefined,
    dividerColor: string | undefined,
    title: string
) => {
    const props: UseStylesPropsType = {
        marginBottom,
        marginLeft,
        color,
        dividerColor
    };
    const classes = useStyles(props);
    const lang = useSelector(getLang);
    const titleLabel = translate(lang, title);

    return {
        classes, titleLabel
    }
};

//============== COMPONENT ==================
export const Title: React.FC<TitlePropsType> = (props): ReactElement => {
    const {
        title,
        variant = 'h5',
        marginBottom = 10,
        marginLeft = 10,
        color,
        dividerColor
    } = props;
    const {
        classes, titleLabel
    } = useTitle(marginBottom, marginLeft, color, dividerColor, title);

    return (
        <>
            <div className={classes.wrapper}>
                <Typography variant={variant}
                            className={classes.title}
                >
                    {titleLabel}
                </Typography>
            </div>

            <Divider className={classes.divider}/>
        </>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5
        },
        title: (props: UseStylesPropsType) => ({
            marginBottom: props.marginBottom,
            marginLeft: props.marginLeft,
            marginRight: 10,
            color: props.color ? props.color : theme.palette.secondary.main
        }),
        divider: (props: UseStylesPropsType) => ({
            backgroundColor: props.dividerColor ? props.dividerColor : theme.palette.primary.light
        }),
    }));

//===================== TYPE =================
type TitlePropsType = {
    title: string
    variant?: Variant | 'inherit'
    marginBottom?: number
    marginLeft?: number
    disabled?: boolean
    color?: string | undefined
    dividerColor?: string | undefined
}
type UseStylesPropsType = {
    marginBottom: number
    marginLeft: number
    color: string | undefined
    dividerColor: string | undefined
}