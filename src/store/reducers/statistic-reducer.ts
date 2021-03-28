//=============== INITIAL =============
import {GetActionsType} from "../store";
import {StatisticItemType} from "../../types/type";

const initialState = {
    statistic: [
        {
            id: 0,
            secs: 45,
            size: 6,
            clickCount: 40
        },
        {
            id: 1,
            secs: 65,
            size: 6,
            clickCount: 50
        },
        {
            id: 2,
            secs: 45,
            size: 4,
            clickCount: 48
        },
        {
            id: 3,
            secs: 57,
            size: 4,
            clickCount: 56
        }
    ] as Array<StatisticItemType>
};

//============== REDUCER ================
const statisticReducer = (state = initialState, action: StatisticActionsType): InitialStateType => {
    switch (action.type) {
        case 'GAME_MEMORY/STATISTIC/ADD_STATISTIC_ITEM': {
            const id = state.statistic.length;
            return {...state, statistic: [...state.statistic, {...action.statisticItem, id}]}
        }
        case 'GAME_MEMORY/STATISTIC/CLEAR': {
            return {...state, statistic: []}
        }
        default:
            return state;
    }
};

//============== ACTIONS =================
export const statisticAC = {
    addStatisticItem: (statisticItem: StatisticItemType) => ({
        type: 'GAME_MEMORY/STATISTIC/ADD_STATISTIC_ITEM',
        statisticItem
    } as const),
    clear: () => ({type: 'GAME_MEMORY/STATISTIC/CLEAR'} as const),
};

//=============== TYPES ==================
export type InitialStateType = typeof initialState;
export type StatisticActionsType = GetActionsType<typeof statisticAC>;

export default statisticReducer;