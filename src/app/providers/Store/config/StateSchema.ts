import {AxiosInstance} from "axios";

// SLICE TYPES
export interface StateSchema {
    counter?: boolean
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}