import { Module } from "vuex";
import { RootState } from "../rootState";
import { locationGetters } from "./locationGetters";
import { defaultLocationState, LocationState } from "./locationState";

export const location: Module<LocationState, RootState> = {
    state: defaultLocationState,
    getters: locationGetters,
}