import { GetterTree } from "vuex";
import { RootState } from "./rootState";

export type Getters = {
    //completedCount(state: State): number,
    totalCount(state: RootState): number,
}

export const getters: GetterTree<RootState, RootState> & Getters = {
    totalCount(state) {
        return state.items.length
    },
    test(state: RootState): number {return 1},
}