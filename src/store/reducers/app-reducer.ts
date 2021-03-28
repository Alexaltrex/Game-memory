//=============== INITIAL =============
import {GetActionsType} from "../store";
import {AlertType, LangType, SidebarItemEnum} from "../../types/type";
import {Color} from "@material-ui/lab/Alert/Alert";

const initialState = {
    sidebarItem: SidebarItemEnum.game, // текущий элемент главного бокового меню
    lang: 'eng' as LangType, // язык приложения
    alert: {
        isShow: false, // показать или нет всплывающее сообщение
        message: '', // текст всплывающего сообщения
        severity: 'success' as Color // тип всплывающего сообщения
    }
};

//============== REDUCER ================
const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'GAME_MEMORY/APP/SET_SIDEBAR_ITEM': {
            return {...state, sidebarItem: action.sidebarItem}
        }
        case 'GAME_MEMORY/APP/SET_LANG': {
            return {...state, lang: action.lang}
        }
        case 'GAME_MEMORY/APP/SET_ALERT': {
            return {...state, alert: action.alert}
        }

        default:
            return state;
    }
};

//============== ACTIONS =================
export const appAC = {
    setSidebarItem: (sidebarItem: SidebarItemEnum) => ({type: 'GAME_MEMORY/APP/SET_SIDEBAR_ITEM', sidebarItem} as const),
    setLang: (lang: LangType) => ({type: 'GAME_MEMORY/APP/SET_LANG', lang} as const),
    setAlert: (alert: AlertType) => ({type: 'GAME_MEMORY/APP/SET_ALERT', alert} as const),
};

//=============== TYPES ==================
export type InitialStateType = typeof initialState;
export type AppActionsType = GetActionsType<typeof appAC>;

export default appReducer;