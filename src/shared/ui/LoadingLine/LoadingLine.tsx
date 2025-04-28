import {useLoadingBar} from "react-top-loading-bar";
import {useEffect, useLayoutEffect, useRef} from "react";
import {useLocation} from "react-router";


export const LoadingLine = () => {
    const firstRender = useRef(true)

    const location = useLocation()

    const { start, complete } = useLoadingBar({
        color: "#5030E5",
        height: 2,
        shadow: false,
    });

    useLayoutEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        start('static')

        // TODO ADD GLOBAL STATE FOR FETCHING AND ADD HERE CHECK IT TO END LOADING BAR

        const timer = setTimeout(() => complete(), 400)

        return () => clearTimeout(timer)
    }, [complete, location.pathname, start]);

    return null
};
