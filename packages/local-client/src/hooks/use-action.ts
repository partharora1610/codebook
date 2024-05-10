import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../state";
import { useMemo } from "react";

export const useAction = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreator, dispatch);
  }, [dispatch]);
};
