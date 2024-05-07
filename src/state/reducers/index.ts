import CellReducer from "./cells-reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  cells: CellReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
