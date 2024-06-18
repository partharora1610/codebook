import { ActionTypes } from "../action-types"
import { Action } from "../actions"
import { Cell } from "../cell"

interface CellState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const reducer = (state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload

      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      }

    case ActionTypes.DELETE_CELL:
      const cellId = action.payload
      const newOrder = state.order.filter((id) => id !== cellId)

      return {
        ...state,
        order: newOrder,
        data: Object.keys(state.data).reduce((acc, key) => {
          if (key !== cellId) {
            acc[key] = state.data[key]
          }
          return acc
        }, {} as CellState["data"]),
      }

    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload
      console.log({ payload: action.payload })
      // Implement move cell logic here
      return state

    case ActionTypes.INSERT_CELL_BEFORE:
      const { id: beforeId, type } = action.payload

      const cell: Cell = {
        content: "",
        type: type,
        id: randomId(),
      }

      state.data[cell.id] = cell

      const foundIndex = state.order.findIndex((id) => id === beforeId)

      if (foundIndex < 0) {
        state.order.push(cell.id)
      } else {
        state.order.splice(foundIndex, 0, cell.id)
      }

      return { ...state } // m chutiya hoon

    case ActionTypes.FETCH_CELL:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case ActionTypes.FETCH_CELL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case ActionTypes.FETCH_CELL_COMPLETE:
      const order = action.payload.map((cell) => cell.id)

      const data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell
        return acc
      }, {} as CellState["data"])

      return {
        order,
        data,
        loading: false,
        error: null,
      }

    case ActionTypes.SAVE_CELL_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

const randomId = () => {
  return Math.random().toString(36).substr(2, 5)
}

export default reducer
