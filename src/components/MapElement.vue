<template>
   <div id="mapContainer" style="background-color: #191A1A"></div>
</template>

<script lang="ts">
import "leaflet/dist/leaflet.css";
import { defineComponent, PropType, ref, watch } from 'vue'
import Location from '@/types/Location'
import L, { Map } from 'leaflet'
const token = 'pk.eyJ1Ijoic2lnbmFsMzIiLCJhIjoiY2t4ZDRiN3E5M2FlaTMwbzEwaWl1dndscSJ9.0oFU8MnW1w7ySVPsphY7xw';
//const token = '';

export default defineComponent({
    emits: ["locationSelected"],
    props: {
        locations: {required: true, type: Array as PropType<Location[]>},
    },
    setup(props, context) {
        watch(props.locations, (now, prev) => {
            console.log("arranging markers");
             markers.value.forEach(e => {
                 e.remove();
             })
             markers.value.length = 0;
            now.forEach(element => {
                markers.value.unshift(
                    L.marker([element.lng, element.lat])
                    .on("click", () => {
                        //console.log(`You clicked on ${element.name}`);
                        context.emit("locationSelected", element);
                    })
                    .addTo(map.value as any))
            });
        })

        const markers = ref<L.Marker[]>([]);
        const map = ref<L.Map>();
        
        return { markers, map }
    },
    mounted() {
        this.map = L.map('mapContainer')
            .on('load', () => { setTimeout(() => {
                this.map?.invalidateSize();
            }, 1); })
            .on('zoom', () => console.log(this.map?.getZoom()))
            .setView([0,0], 4);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
            attribution: 'Yeet',
            maxZoom: 10,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: token,
        }).addTo(this.map as any); //uhm

        const marker = L.marker([37.7749, -122.4194]).addTo(this.map as any);

/*        this.map.on('load', () => { setTimeout(() => {
            this.map?.invalidateSize();
            alert("i did a thing!");
        }, 1); });*/
        //this.map.on('click', () => alert("yo bitches"));
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