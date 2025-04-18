import {StateSchema, ThunkExtraArg} from "./StateSchema.ts";
import {configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {$api} from "@/shared/api/api.ts";
import {rtkApi} from "@/shared/api/rtkApi.ts";
import {UserSliceReducer} from "@/entities/User";
import {RegistrationSliceReducer} from "@/features/Registration";
import {createNewCompanyService} from "@/features/CreateNewCompany/model/services/createNewCompanyService.ts";
import {newCompanySliceReducer} from "@/features/CreateNewCompany";
import {inviteToCompanyReducer} from "@/features/InviteToCompany";
import {ProjectReducer} from "@/entities/Project";

export function createReduxStore(
    initialState?: Partial<StateSchema>,
) {

    // REDUCERS
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: UserSliceReducer,
        registration: RegistrationSliceReducer,
        newCompany: newCompanySliceReducer,
        inviteToCompany: inviteToCompanyReducer,
        projects: ProjectReducer,
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