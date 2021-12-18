<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Hello World</ion-title>
            </ion-toolbar>
        </ion-header>
    
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Hello World</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-button @click="setOrder('name')">Order by Name</ion-button>
            <ion-button @click="setOrder('id')">Order by ID</ion-button>
        
            <div id="container">
                <TodoList :locations="locations" :order="order"/>
            </div>
            <p>{{order}}</p>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button @click="router.push('/edit')">+</ion-fab-button>
            </ion-fab>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonButton } from '@ionic/vue';
import TodoList from '@/components/TodoList.vue';
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
    },

    setup() {
        const store = useStore()

        store.commit(MutationType.SetItems, [
            { id: "1", name: "xcafe", description: "", lng: 0.0, lat: 0.0 },
            { id: "2", name: "pub777", description: "", lng: 0.1, lat: 0.0 }
        ]);

        const order = ref<OrderTerm>('id');
        const router = useRouter();

        const setOrder = (term: OrderTerm) => {
            order.value = term;
        }

        //const locations = ref<Location[]>(store.state.items); //refs fuck this up when using store?
        const locations = store.state.items;
    
        return {locations, setOrder, order, router};
    },
});
</script>

<style scoped>
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