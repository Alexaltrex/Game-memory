import {StateType} from "../store";

export const getSize = (state: StateType) => state.game.size;
export const getIsGameStart = (state: StateType) => state.game.isGameStart;
export const getIsStepStart = (state: StateType) => state.game.isStepStart;
export const getSecs = (state: StateType) => state.game.secs;
export const getStepSecs = (state: StateType) => state.game.stepSecs;
export const getCards = (state: StateType) => state.game.cards;
export const getFirstCardIndex = (state: StateType) => state.game.firstCardIndex;
export const getSecondCardIndex = (state: StateType) => state.game.secondCardIndex;
export const getClickCount = (state: StateType) => state.game.clickCount;
export const getOpenCardCount = (state: StateType) => state.game.openCardCount;
export const getArrayOfEndedSymbols = (state: StateType) => state.game.arrayOfEndedSymbols;
export const getIsBlock = (state: StateType) => state.game.isBlock;
