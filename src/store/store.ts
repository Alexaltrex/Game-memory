import {applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import appReducer from "./reducers/app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import gameReducer from "./reducers/game-reducer";
import statisticReducer from "./reducers/statistic-reducer";

let rootReducer = combineReducers({
    app: appReducer,
    game: gameReducer,
    statistic: statisticReducer
});

const middleware: Array<Middleware> = [];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));


//======================== TYPE ==========================
export type StateType = ReturnType<typeof rootReducer>
export type GetActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
