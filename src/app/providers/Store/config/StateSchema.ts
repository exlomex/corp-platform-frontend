import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";
import {RegistrationSliceSchema} from "@/features/Registration";
import {newCompanySliceSchema} from "@/features/CreateNewCompany";
import {inviteToCompanySliceSchema} from "@/features/InviteToCompany";
import {ProjectSliceSchema} from "@/entities/Project/model/types/projectSliceSchema.ts";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
    registration: RegistrationSliceSchema;
    newCompany: newCompanySliceSchema;
    inviteToCompany: inviteToCompanySliceSchema;
    projects: ProjectSliceSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
