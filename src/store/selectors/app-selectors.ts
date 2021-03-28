import {StateType} from "../store";

export const getLang = (state: StateType) => state.app.lang;
export const getSidebarItem = (state: StateType) => state.app.sidebarItem;
export const getAlert  = (state: StateType) => state.app.alert;
