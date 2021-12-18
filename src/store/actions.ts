import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
    GetItems = 'GET_ITEMS',
}

//tbh i don't know how this works but it does
type ActionArguments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.GetItems](context: ActionArguments): void
}

export const actions: ActionTree<State, State> & Actions = {
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