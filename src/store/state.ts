import Location from "@/types/Location"

export type State = {
    loading: boolean,
    items: Location[],
}

export const state: State  = {
    loading: false,
    items: [],
}