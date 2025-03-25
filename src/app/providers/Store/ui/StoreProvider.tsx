import {StateSchema} from "@/app/providers/Store/config/StateSchema.ts";
import {Provider} from "react-redux";
import {ReactNode} from "react";
import {createReduxStore} from "@/app/providers/Store/config/store.ts";

interface StoreProviderProps {
    initialState?: Partial<StateSchema>;
    children: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { initialState, children } = props;
    return (
        <Provider store={createReduxStore(initialState)}>
            {children}
        </Provider>
    )
};
