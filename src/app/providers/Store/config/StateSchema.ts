import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";
import {RegistrationSliceSchema} from "@/features/Registration";
import {newCompanySliceSchema} from "@/features/CreateNewCompany";
import {inviteToCompanySliceSchema} from "@/features/InviteToCompany";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
    registration: RegistrationSliceSchema;
    newCompany: newCompanySliceSchema;
    inviteToCompany: inviteToCompanySliceSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
