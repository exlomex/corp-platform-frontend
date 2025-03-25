import {StateSchema, ThunkExtraArg} from "./StateSchema.ts";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {$api} from "@/shared/api/api.ts";
import {rtkApi} from "@/shared/api/rtkApi.ts";

export function createReduxStore(
    initialState?: StateSchema
) {

    // REDUCERS
    const rootReducers: ReducersMapObject<StateSchema> = {

    };

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    return configureStore({
        reducer: rootReducers,
        devTools: import.meta.env.MODE === 'development',
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];