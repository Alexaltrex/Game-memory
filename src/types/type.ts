import {Color} from "@material-ui/lab";

export type LangType = 'eng' | 'rus';

export enum SidebarItemEnum {
    game = 1,
    rules = 2,
    settings = 3,
    statistic = 4
}

export type CardType = {
    index: number // номер в массиве
    status: StatusType,
    symbol: number // номер символа
}
export type StatusType = 'close' | 'open' | 'end' // закрыта, открыта, выбрана вместе с парной
export type StatisticItemType = {
    id: number
    secs: number // количество секунд
    size: number //  размерность игрового поля
    clickCount: number // количество карт, которые открывали
}
export type AlertType = {
    isShow: boolean
    message: string
    severity: Color
}
export type SortValueType = 'increment' | 'decrement';
export type SortModeType = 'id' | 'secs' | 'size' | 'clickCount';