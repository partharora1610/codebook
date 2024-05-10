import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const reducer = (
  state: BundleState = initialState,
  action: Action
): BundleState => {
  switch (action.type) {
    case ActionTypes.BUNDLE_START:
      const { cellId } = action.payload;
      return { ...state, [cellId]: { loading: true, code: "", err: "" } };

    case ActionTypes.BUNDLE_COMPLETE:
      const { cellId: id, bundle } = action.payload;
      return {
        ...state,
        [id]: { loading: false, code: bundle.code, err: bundle.err },
      };

    default:
      return state;
  }
};

export default reducer;
