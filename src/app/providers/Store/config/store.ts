import {StateSchema, ThunkExtraArg} from "./StateSchema.ts";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {$api} from "@/shared/api/api.ts";
import {rtkApi} from "@/shared/api/rtkApi.ts";
import {UserSliceReducer} from "@/entities/User";

export function createReduxStore(
    initialState?: Partial<StateSchema>,
) {

    // REDUCERS
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: UserSliceReducer,
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