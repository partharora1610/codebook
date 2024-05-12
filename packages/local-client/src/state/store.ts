import { Tuple, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
// import { ActionTypes } from "./action-types";

export const store = configureStore({
  reducer: reducers,
  middleware: () => new Tuple(thunk),
});

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });

// store.dispatch({
//   type: ActionTypes.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });
