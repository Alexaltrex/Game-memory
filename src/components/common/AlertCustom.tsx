import {Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getAlert} from "../../store/selectors/app-selectors";
import React from "react";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {appAC} from "../../store/reducers/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//================= CUSTOM HOOK ===============
const useSnackbarCustom = () => {
    const alert = useSelector(getAlert);
    const dispatch = useDispatch();
    const onCloseHandler = (
        event?: React.SyntheticEvent,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appAC.setAlert({
            isShow: false,
            message: '',
            severity: 'success'
        }));
    };

    return {
        alert, onCloseHandler
    }
};

//================= COMPONENT ===============
const AlertCustom: React.FC<{}> = () => {
    const {
        alert, onCloseHandler
    } = useSnackbarCustom();
    // @ts-ignore
    // @ts-ignore
    return (
        <Snackbar open={alert.isShow}
                  autoHideDuration={4000}
                  onClose={onCloseHandler}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                  }}
        >
            <Alert onClose={onCloseHandler} severity={alert.severity}>
                {alert.message}
            </Alert>
        </Snackbar>
    )
};
export default AlertCustom

