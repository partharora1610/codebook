import { ActionTypes } from "../action-types";
import { CellTypes, Cell } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: ActionTypes.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellAction {
  type: ActionTypes.FETCH_CELL;
}

export interface FetchCellComplete {
  type: ActionTypes.FETCH_CELL_COMPLETE;
  payload: Cell[];
}

export interface FetchCellError {
  type: ActionTypes.FETCH_CELL_ERROR;
  payload: string;
}

export interface SaveCellErrorAction {
  type: ActionTypes.SAVE_CELL_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellAction
  | FetchCellComplete
  | FetchCellError
  | SaveCellErrorAction;
