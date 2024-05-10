import CellReducer from "./cells-reducer";
import BundleReducer from "./bundles-reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  cells: CellReducer,
  bundles: BundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
