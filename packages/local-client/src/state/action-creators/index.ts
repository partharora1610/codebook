import { Dispatch } from "redux"
import {
  DeleteCellAction,
  Direction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
  Action,
} from "../actions"
import { ActionTypes } from "../action-types"
import { Cell, CellTypes } from "../cell"
import bundler from "@/bundler"
import axios from "axios"
import { RootState } from "../reducers"

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  }
}

export const insertCellBefore = (
  id: string | null,
  cellType: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionTypes.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  }
}

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    })

    const result = await bundler(input)

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.error,
        },
      },
    })
  }
}

export const fetchCell = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.FETCH_CELL,
    })

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells")
      console.log("Coming from fetch cell", data)

      dispatch({
        type: ActionTypes.FETCH_CELL_COMPLETE,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_CELL_ERROR,
        payload: "",
      })
    }
  }
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState()

    const cells = order.map((id) => data[id])

    try {
      const data = await axios.post("/cells", { cells })
      console.log("data", data)
    } catch (error) {
      dispatch({
        type: ActionTypes.SAVE_CELL_ERROR,
        payload: "Error in save cell error",
      })
    }
  }
}
