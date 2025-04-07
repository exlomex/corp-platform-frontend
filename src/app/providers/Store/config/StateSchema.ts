import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";
import {RegistrationSliceSchema} from "@/features/Registration";
import {newCompanySliceSchema} from "@/features/CreateNewCompany";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
    registration: RegistrationSliceSchema;
    newCompany: newCompanySliceSchema
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
