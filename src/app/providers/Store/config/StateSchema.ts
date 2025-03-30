import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";
import {RegistrationSliceSchema} from "@/features/Registration";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
    registration: RegistrationSliceSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
