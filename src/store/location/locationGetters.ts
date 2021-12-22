import { GetterTree } from "vuex";
import { RootState } from "../rootState";
import { LocationState } from "./locationState";

export type LocationGetters = {
    testMethod(state: LocationState): number,
}

export const locationGetters: GetterTree<LocationState, RootState> & LocationGetters = {
    testMethod(state) { return 99 },
}