<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Edit</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>

            <ion-grid>
                <ion-row>
                    <ion-col>
                        <h3> Add new location:</h3>
                        <form @submit.prevent="submitForm">
                            <ion-item>
                                <ion-label>Name</ion-label>
                                <ion-input v-model="location.name" placeholder="A simple name for this location"/>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">Description</ion-label>
                                <ion-textarea v-model="location.description" placeholder="A short description of this place"></ion-textarea>
                            </ion-item>
                            <ion-item>
                                <ion-label>Latitude</ion-label>
                                <ion-input v-model="location.lat" type="number" value="0.0"/>
                            </ion-item>
                            <ion-item>
                                <ion-label>Longitude</ion-label>
                                <ion-input v-model="location.lng" type="number" value="0.0"/>
                            </ion-item>

                            <ion-button expand="block" type="submit">Submit</ion-button>
                        </form>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonButton, IonInput } from '@ionic/vue';
import { defineComponent, ref, } from 'vue'
import Location from '@/types/Location'
import { useStore } from '@/store/index';
import { MutationType } from '@/store/mutations';
import { useRouter } from 'vue-router';
import router from '@/router';

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonBackButton,
        IonButtons,
        IonItem,
        IonButton,
        IonInput,
    },
    setup() {
        const location = ref<Location>({
             id: Math.random().toString(),
             name: "",
             description: "",
             lat: 0.0,
             lng: 5.0,
         });

        const name = ref("yo");
        const store = useStore();
        const router = useRouter();
        return {location, name, store};
    },
    methods: {
        submitForm() {
            console.log(this.location);
            this.store.commit(MutationType.CreateItem, this.location)
            console.log(this.store.state.items)
            router.back()
        }
    },
})
</script>
