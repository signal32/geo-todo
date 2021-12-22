import Location from "@/types/Location"
import { LocationState } from "./location/locationState"

export interface RootState {
    loading: boolean,
    items: Location[],
    location?: LocationState // Workaround for ts module typing (include all submodules here)
}

/**
 * Default state of the RootState
 */
export const defaultRootState: RootState = {
    loading: false,
    items: [],
} as unknown as RootState // Required as part of module typing workaround
