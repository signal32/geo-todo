import { MutationTree } from "vuex";
import { State } from "./state";
import Location from "@/types/Location";

export enum MutationType {
    CreateItem = 'CREATE_ITEM',
    SetItems = 'SET_ITEMS',
    CompleteItem = 'COMPLETE_ITEM',
}

export type Mutations = {
    // [mutation](input args):output args
    [MutationType.CreateItem](state: State, item: Location): void,  
    [MutationType.SetItems](state: State, items: Location[]): void,
    [MutationType.CompleteItem](state: State, item: Partial<Location> & {id: number}): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateItem](state, item) {
        state.items.unshift(item);
    },
    [MutationType.SetItems](state, item) {
        state.items = item;
    },
    [MutationType.CompleteItem](state, newItem){
        const item = state.items.findIndex(s => s.id === newItem.id);
        if (item === -1) return;
        state.items[item] = { ...state.items[item], ...newItem};
    },
}