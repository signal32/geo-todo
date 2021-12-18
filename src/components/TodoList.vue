<template>
    <p>Ordered by {{order}}</p>
    <ion-list>
        <ion-item>
            <ion-label>{{name}}</ion-label>
        </ion-item>
        <ion-item v-for="location in orderedLocations" :key="location.id">
            <ion-label>{{location.name}} {{location.id}}</ion-label>
        </ion-item>
    </ion-list>
    <ion-button @click="changeName('fuck off')">Change Name</ion-button>
    
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue'
import Location from '@/types/Location'
import OrderTerm from '@/types/OrderTerm'

export default defineComponent({
    props: {
        locations: {required: true, type: Array as PropType<Location[]>},
        order: {required: true, type: String as PropType<OrderTerm>}
    },
    setup(props) {
        const name = ref<string>('Empty');

        const orderedLocations = computed(() => {
            return [...props.locations].sort( (a: Location, b: Location) => {
                return a[props.order] > b[props.order] ? 1 : -1  //Square brackets to access dynamic property eg name, location, id. Swap if true (1)
            })
        });

        return {name, orderedLocations}
    },


    methods: {
        changeName(name: string){
            this.name = name;
        }
    },
})
</script>
