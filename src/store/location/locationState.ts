import Location from "@/types/Location"

export interface LocationState {
    locations: Location[],
}

export const defaultLocationState: LocationState = {
    locations: [{name: "test_location", description: "example", lat: 69, lng: 420, id: "0"}]
}