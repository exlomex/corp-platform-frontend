import {LoadingBarRef} from "react-top-loading-bar";
import {useRef} from "react";

interface useLoadingBarReturnValue {
    startLoadingBar: () => void;
    endLoadingBar: () => void;
}
export const useLoadingBarHook = (ref: ReturnType<typeof useRef<LoadingBarRef>>): useLoadingBarReturnValue => {
    const startLoadingBar = () => ref.current?.staticStart();
    const endLoadingBar = () => ref.current?.complete();

    return {
        endLoadingBar,
        startLoadingBar
    }
};
