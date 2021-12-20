<template>
   <div id="mapContainer"></div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import { defineComponent, PropType, ref, watch } from 'vue'
import Location from '@/types/Location'
import L, { Map } from 'leaflet'
const token = 'pk.eyJ1Ijoic2lnbmFsMzIiLCJhIjoiY2t4ZDRiN3E5M2FlaTMwbzEwaWl1dndscSJ9.0oFU8MnW1w7ySVPsphY7xw';
//const token = '';

export default defineComponent({
    props: {
        locations: {required: true, type: Array as PropType<Location[]>},
    },
    setup(props) {
        watch(props.locations, (now, prev) => {
            console.log("arranging markers");
            
             markers.value.forEach(e => {
                 e.remove();
             })
             markers.value.length = 0;
            
            now.forEach(element => {
                markers.value.unshift(
                    L.marker([element.lng, element.lat])
                    .on("click", () => alert(`You clicked on ${element.name}`))
                    .addTo(map.value as any))
            });
        })

        const markers = ref<L.Marker[]>([]);
        const map = ref<L.Map>();
        
        return { markers, map }
    },
    mounted() {
        this.map = L.map('mapContainer').setView([37.7749, -122.4194], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
            attribution: 'Yeet',
            maxZoom: 10,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: token,
        }).addTo(this.map as any); //uhm

        const marker = L.marker([37.7749, -122.4194]).addTo(this.map as any);

        this.map.whenReady(() => this.map?.invalidateSize() )
        //return map;
    },
})
</script>

<style scoped>
#mapContainer {
 width: 100%;
 height: 100%;
}
</style>