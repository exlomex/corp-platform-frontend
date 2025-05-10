import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";
import {RegistrationSliceSchema} from "@/features/Registration";
import {newCompanySliceSchema} from "@/features/CreateNewCompany";
import {inviteToCompanySliceSchema} from "@/features/InviteToCompany";
import {ProjectSliceSchema} from "@/entities/Project/model/types/projectSliceSchema.ts";
import {rtkApi} from "@/shared/api/rtkApi.ts";
import {newProjectSliceSchema} from "@/features/CreateNewProject/model/types/newProjectSliceSchema.ts";
import {BoardSliceSchema} from "@/entities/Board";
import {newBoardSliceSchema} from "@/features/CreateNewBoard/model/types/newBoardSliceSchema.ts";
import {PasswordRecoverySliceSchema} from "@/features/PasswordRecovery";
import {StatusSliceSchema} from "@/entities/Status";
import {TaskSliceSchema} from "@/entities/Task";
import {CommentSliceSchema} from "@/features/TaskInfo";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
    registration: RegistrationSliceSchema;
    newCompany: newCompanySliceSchema;
    inviteToCompany: inviteToCompanySliceSchema;
    projects: ProjectSliceSchema;
    newProject: newProjectSliceSchema;
    board: BoardSliceSchema;
    newBoard: newBoardSliceSchema;
    passwordRecovery: PasswordRecoverySliceSchema;
    status: StatusSliceSchema;
    task: TaskSliceSchema;
    comment: CommentSliceSchema;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
