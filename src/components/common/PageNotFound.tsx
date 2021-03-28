import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles/createStyles";

//======================= COMPONENT ===============================
export const PageNotFound: React.FC = () => {
    const classes = useStyles();
    return (
        <section className={classes.pageNotFound}>
            <Typography align='center'
                        color='error'
                        variant='h3'>
                Page not found
            </Typography>
        </section>

    )

};

//============================= STYLE ==========================
const useStyles = makeStyles((
    //theme: Theme
    ) =>
    createStyles({
            pageNotFound: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            },
        }
    )
);

