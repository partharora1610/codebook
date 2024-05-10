import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@/state";

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
