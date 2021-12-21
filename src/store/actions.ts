import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { RootState } from "./rootState";

export enum ActionTypes {
    GetItems = 'GET_ITEMS',
}

//tbh i don't know how this works but it does
type ActionArguments = Omit<ActionContext<RootState, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetItems](context: ActionArguments): void
}

export const actions: ActionTree<RootState, RootState> & Actions = {
    async [ActionTypes.GetItems]({commit}){
        commit(MutationType.SetItems, [
            {
                name: 'loading_test',
                description: '',
                id: '69',
                lat: 0.0,
                lng: 0.0,
            },
        ])
    }
}