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
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import TodoList from '@/components/TodoList.vue';
import Location from '@/types/Location'
import OrderTerm from '@/types/OrderTerm'
import { defineComponent, ref } from 'vue';

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        TodoList,
    },

    setup() {
        const locations = ref<Location[]>([
        { id: "1", name: "xcafe", description: "", lng: 0.0, lat: 0.0 },
        { id: "2", name: "pub", description: "", lng: 0.1, lat: 0.0 }
        ]);

        const order = ref<OrderTerm>('id');

        const setOrder = (term: OrderTerm) => {
            order.value = term;
        }
    
        return {locations, setOrder, order};
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