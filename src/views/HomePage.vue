<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>GeoTodo</ion-title>
                <p>modal: {{showModal}} detailsModal: {{showLocationModal}}</p>
            </ion-toolbar>
        </ion-header>
    
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Hello World</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="Map">
                <map-element :locations="locations" @locationSelected="showLocation"/>
            </div>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="router.push('/edit')">+</ion-fab-button>
                <ion-fab-button @click="showModal = true">!</ion-fab-button>
            </ion-fab>

            <ion-modal :is-open="showModal" :backdrop-dismiss="true" :breakpoints="[0.4, 0.5, 1]" :initialBreakpoint="0.5" v-on:didDismiss="showModal=false">
                <ion-content>
                    <ion-button @click="setOrder('name')">Order by Name</ion-button>
                    <ion-button @click="setOrder('id')">Order by ID</ion-button>
                    <TodoList :locations="locations" :order="order" @locationSelected="showLocationId"/>
                </ion-content>
            </ion-modal>

            <ion-modal :is-open="showLocationModal" :backdrop-dismiss="true" :breakpoints="[0.4, 0.5, 1]" :initialBreakpoint="0.5" v-on:didDismiss="showLocationModal=false">
                <ion-content>
                    <ion-header translucent>
                        <ion-toolbar>
                            <ion-title>{{selectedLocation.name}}</ion-title>
                            <ion-buttons slot="end">
                                <ion-button onclick="showLocationModal=false">X</ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                    </ion-header>
                    <div slot="fixed">
                        <p>{{selectedLocation}}</p>
                    </div>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonButton, IonModal } from '@ionic/vue';
import TodoList from '@/components/TodoList.vue';
import MapElement from '@/components/MapElement.vue';
import Location from '@/types/Location'
import OrderTerm from '@/types/OrderTerm'
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { MutationType } from '@/store/mutations';

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        TodoList,
        IonFab,
        IonFabButton,
        IonButton,
        IonModal,
        MapElement,
    },
    methods: {
        showLocation(event: Location){
            console.log(event)
            this.selectedLocation = event;
            this.showLocationModal = true;
        },
        showLocationId(id: string){
            this.showModal = false;
            let x = this.store.state.items.find((l: Location) => id == l.id) as Location;
            this.showLocation(x);
        }
    },
    setup() {
        const store = useStore()

        store.commit(MutationType.SetItems, [
            { id: Math.random().toString(), name: "xcafe", description: "", lng: 0.0, lat: 0.0 },
            { id: Math.random().toString(), name: "pub777", description: "", lng: 0.1, lat: 0.0 }
        ]);

        const order = ref<OrderTerm>('id');
        const router = useRouter();

        const setOrder = (term: OrderTerm) => {
            order.value = term;
        }
        const showModal = ref(true);
        const showLocationModal = ref(false);
        //const locations = ref<Location[]>(store.state.items); //refs fuck this up when using store?
        const locations = store.state.items;
        const selectedLocation = ref<Location>({
            description: "", id: "", lat: 0, lng: 0, name: ""
        });
        return {locations, setOrder, order, router, showModal, showLocationModal, store, selectedLocation};
    },
});
</script>

<style scoped>

#Map {
    width: 100vw;
    height: 100vh;
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>