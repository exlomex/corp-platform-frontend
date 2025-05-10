import {StateSchema, ThunkExtraArg} from "./StateSchema.ts";
import {Action, AnyAction, combineReducers, configureStore, ReducersMapObject} from "@reduxjs/toolkit";
import {$api} from "@/shared/api/api.ts";
import {rtkApi} from "@/shared/api/rtkApi.ts";
import {UserSliceReducer} from "@/entities/User";
import {RegistrationSliceReducer} from "@/features/Registration";
import {newCompanySliceReducer} from "@/features/CreateNewCompany";
import {inviteToCompanyReducer} from "@/features/InviteToCompany";
import {ProjectReducer} from "@/entities/Project";
import {newProjectSliceReducer} from "@/features/CreateNewProject";
import {BoardReducer} from "@/entities/Board/model/slice/boardSlice.ts";
import {newBoardSliceReducer} from "@/features/CreateNewBoard";
import {PasswordRecoveryReducer} from "@/features/PasswordRecovery";
import {StatusReducer} from "@/entities/Status";
import {TaskReducer} from "@/entities/Task";
import {CommentReducer} from "@/features/TaskInfo";

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
        newProject: newProjectSliceReducer,
        board: BoardReducer,
        newBoard: newBoardSliceReducer,
        passwordRecovery: PasswordRecoveryReducer,
        status: StatusReducer,
        task: TaskReducer,
        comment: CommentReducer,

        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const combinedReducer = combineReducers(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    return configureStore({
        reducer: combinedReducer,
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