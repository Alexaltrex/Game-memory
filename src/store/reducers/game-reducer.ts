import {GetActionsType} from "../store";
import {stepTime} from "../../utils/consts";
import {CardType, StatusType} from "../../types/type";

//=============== INITIAL =============
const cards: Array<CardType> = [];
for (let i = 0; i < 36; i++) {
    cards[i] = {
        index: i,
        status: 'close',
        symbol: i
    }
}
const initialState = {
    size: 6, // размер игрового поля,
    isGameStart: false, // запущена ли игра
    isStepStart: false, // шаг игры начат, таймер обратного отсчета запущен, первая карточка выбрана
    secs: 0, // время игры
    stepStart: false, // запущен ли ход
    stepSecs: stepTime, // время хода
    cards: cards as Array<CardType>,
    firstCardIndex: null as null | number, // индекс первой в паре открытой карточки
    secondCardIndex: null as null | number, // индекс второй в паре открытой карточки
    clickCount: 0, // количество карт, которые открывали (для статистики)
    openCardCount: 0, // количество открытых карт (если = size*size - победа)
    arrayOfEndedSymbols: [] as Array<number>, // массив названий угаданных символов
    isBlock: false // блокировка нажатия на карточки на время анимации
};

//============== REDUCER ================
const gameReducer = (state = initialState, action: GameActionsType): InitialStateType => {
    switch (action.type) {
        case 'GAME_MEMORY/GAME/SET_SIZE': {
            return {...state, size: action.size}
        }
        case 'GAME_MEMORY/GAME/SET_IS_GAME_START': {
            return {...state, isGameStart: action.isGameStart}
        }
        case 'GAME_MEMORY/GAME/SET_IS_STEP_START': {
            return {...state, isStepStart: action.isStepStart}
        }
        case 'GAME_MEMORY/GAME/SET_SECS': {
            return {...state, secs: action.secs}
        }
        case 'GAME_MEMORY/GAME/SET_STEP_SECS': {
            return {...state, stepSecs: action.stepSecs}
        }
        case 'GAME_MEMORY/GAME/SET_CARD_STATUS': {
            return {
                ...state,
                cards: state.cards.map(card => card.index === action.index ? {...card, status: action.status} : card)
            }
        }
        case 'GAME_MEMORY/GAME/SET_CARDS': {
            return {...state, cards: action.cards}
        }
        case 'GAME_MEMORY/GAME/SET_FIRST_CARD_INDEX': {
            return {...state, firstCardIndex: action.firstCardIndex}
        }
        case 'GAME_MEMORY/GAME/SET_SECOND_CARD_INDEX': {
            return {...state, secondCardIndex: action.secondCardIndex}
        }
        case 'GAME_MEMORY/GAME/SET_CLICK_COUNT': {
            return {...state, clickCount: action.clickCount}
        }
        case 'GAME_MEMORY/GAME/SET_OPEN_CARD_COUNT': {
            return {...state, openCardCount: action.openCardCount}
        }
        case 'GAME_MEMORY/GAME/ADD_SYMBOL': {
            return {...state, arrayOfEndedSymbols: [...state.arrayOfEndedSymbols, action.symbol]}
        }
        case 'GAME_MEMORY/GAME/CLEAR_ARRAY_OF_ENDED_SYMBOLS': {
            return {...state, arrayOfEndedSymbols: []}
        }
        case 'GAME_MEMORY/GAME/SET_IS_BLOCK': {
            return {...state, isBlock: action.isBlock}
        }
        default:
            return state;
    }
};

//============== ACTIONS =================
export const gameAC = {
    setSize: (size: number) => ({type: 'GAME_MEMORY/GAME/SET_SIZE', size} as const),
    setIsGameStart: (isGameStart: boolean) => ({type: 'GAME_MEMORY/GAME/SET_IS_GAME_START', isGameStart} as const),
    setIsStepStart: (isStepStart: boolean) => ({type: 'GAME_MEMORY/GAME/SET_IS_STEP_START', isStepStart} as const),
    setSecs: (secs: number) => ({type: 'GAME_MEMORY/GAME/SET_SECS', secs} as const),
    setStepSecs: (stepSecs: number) => ({type: 'GAME_MEMORY/GAME/SET_STEP_SECS', stepSecs} as const),
    setCardStatus: (index: number, status: StatusType) => ({
        type: 'GAME_MEMORY/GAME/SET_CARD_STATUS',
        index,
        status
    } as const),
    setCards: (cards: Array<CardType>) => ({type: 'GAME_MEMORY/GAME/SET_CARDS', cards} as const),
    setFirstCardIndex: (firstCardIndex: number | null) => ({
        type: 'GAME_MEMORY/GAME/SET_FIRST_CARD_INDEX',
        firstCardIndex
    } as const),
    setSecondCardIndex: (secondCardIndex: number | null) => ({
        type: 'GAME_MEMORY/GAME/SET_SECOND_CARD_INDEX',
        secondCardIndex
    } as const),
    setClickCount: (clickCount: number) => ({type: 'GAME_MEMORY/GAME/SET_CLICK_COUNT', clickCount} as const),
    setOpenCardCount: (openCardCount: number) => ({
        type: 'GAME_MEMORY/GAME/SET_OPEN_CARD_COUNT',
        openCardCount
    } as const),
    addSymbol: (symbol: number) => ({type: 'GAME_MEMORY/GAME/ADD_SYMBOL', symbol} as const),
    clearArrayOfEndedSymbols: () => ({type: 'GAME_MEMORY/GAME/CLEAR_ARRAY_OF_ENDED_SYMBOLS'} as const),
    setIsBlock: (isBlock: boolean) => ({type: 'GAME_MEMORY/GAME/SET_IS_BLOCK', isBlock} as const),
};

//=============== TYPES ==================
export type InitialStateType = typeof initialState;
export type GameActionsType = GetActionsType<typeof gameAC>;

export default gameReducer;