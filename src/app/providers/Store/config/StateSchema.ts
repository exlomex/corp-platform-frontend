import {AxiosInstance} from "axios";
import {UserSliceSchema} from "@/entities/User";

// SLICE TYPES
export interface StateSchema {
    user: UserSliceSchema;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}
