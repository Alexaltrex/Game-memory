import {StateType} from "../store";

export const getStatistic = (state: StateType) => state.statistic.statistic;
export const getSortValue = (state: StateType) => state.statistic.sortValue;
export const getSortMode = (state: StateType) => state.statistic.sortMode;
