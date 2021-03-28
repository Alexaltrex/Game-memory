import React, {ReactElement, useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Header} from "./Header/Header";
import {Sidebar} from "./Sidebar/Sidebar";
import {headerHeight} from "../utils/consts";
import {Main} from "./Main/Main";
import {getLang, getSidebarItem} from "../store/selectors/app-selectors";
import {useDispatch, useSelector} from "react-redux";
import {useQueryParam, NumberParam, StringParam,} from "use-query-params";
import {appAC} from "../store/reducers/app-reducer";
import {LangType, SidebarItemEnum} from "../types/type";
import {getSize} from "../store/selectors/game-selectors";
import {gameAC} from "../store/reducers/game-reducer";

//============= CUSTOM HOOK =============
const useApp = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sidebarItem = useSelector(getSidebarItem);
    const lang = useSelector(getLang);
    const size = useSelector(getSize);
    // хранение данных в url для предотвращения потери при перезагрузке
    const [sidebarItemQuery, setSidebarItemQuery] = useQueryParam('sidebarItem', NumberParam);
    const [langQuery, setLangQuery] = useQueryParam('lang', StringParam);
    const [sizeQuery, setSizeQuery] = useQueryParam('size', NumberParam);
    // URL => STATE
    useEffect(() => {
        dispatch(appAC.setSidebarItem(sidebarItemQuery ? sidebarItemQuery : sidebarItem));
        dispatch(appAC.setLang(langQuery ? langQuery as LangType : lang));
      dispatch(gameAC.setSize(sizeQuery ? sizeQuery : size));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setSidebarItemQuery((sidebarItem && sidebarItem !== SidebarItemEnum.game) ? sidebarItem : undefined);
        setLangQuery((lang && lang !== 'eng') ? lang : undefined);
        setSizeQuery((size && size !== 6) ? size : undefined);
    }, [
        sidebarItem,
        lang,
        size
    ]);


    return {
        classes
    }
};

//============== COMPONENT ==================
export const App: React.FC<{}> = (): ReactElement => {
    const {
        classes
    } = useApp();

    return (
        <div className={classes.app}>
            <div className={classes.wrapper}>
                <Header/>
                <div className={classes.innerWrapper}>
                    <Sidebar/>
                    <Main/>
                </div>
            </div>
        </div>
    );
};

//============================= STYLE ==========================
const useStyles = makeStyles({
    app: {
        height: '100vh'
    },
    wrapper: {
        maxWidth: 1240,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        height: '100vh'
    },
    innerWrapper: {
        display: 'flex',
        height: `calc(100vh - ${headerHeight}px)`
    }
});


