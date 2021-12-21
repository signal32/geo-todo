import { createLogger, StoreOptions, CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";
import { RootState, defaultRootState } from "./rootState";
import { Mutations, mutations } from "./mutations";
import { Actions, actions} from "./actions";
import { Getters, getters } from "./getters";
import { location } from "./location";

const storeConfig: StoreOptions<RootState> = {
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
    state: defaultRootState,
    mutations,
    actions,
    getters,
    modules: {
        location
    },
};

export const store =  new VuexStore<RootState>(storeConfig) as Store;

/**
 * Get the global store instance
 * @returns Current global store instance
 */
export function useStore(): Store{
    return store
}


/**
 * Custom type to give ts knowledge of getters, mutations and actions.
 */
export type Store = Omit<VuexStore<RootState>,'getters' | 'commit' | 'dispatch'>
 & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>
} & {
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Actions[K]>
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    }
}


