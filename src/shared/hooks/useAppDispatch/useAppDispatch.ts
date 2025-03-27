import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/providers/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>()