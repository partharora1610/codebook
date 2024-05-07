import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };

    case ActionTypes.DELETE_CELL:
      return state;

    case ActionTypes.MOVE_CELL:
      return state;

    case ActionTypes.INSERT_CELL_BEFORE:
      const { id: beforeId, type } = action.payload;

      const cell: Cell = {
        content: "",
        type: type,
        id: randomId(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex((id) => id === beforeId);

      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }

      return state;

    default:
      return state;
  }
};
const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
