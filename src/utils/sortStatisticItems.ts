import {SortModeType, SortValueType, StatisticItemType} from "../types/type";

export const sortStatisticItems = (
    sortMode: SortModeType, // 'order' | 'time' | 'size' | 'clickCount'
    sortValue: SortValueType // 'increment' | 'decrement'
) => {
    return (
        a: StatisticItemType,
        b: StatisticItemType
    ) => {
        if (a[sortMode] > b[sortMode]) {
            return sortValue === 'increment' ? 1 : -1
        } else if (a[sortMode] < b[sortMode]) {
            return sortValue === 'increment' ? -1 : 1
        }
        return 0
    }

}