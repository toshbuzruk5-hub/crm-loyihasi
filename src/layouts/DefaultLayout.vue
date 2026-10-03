<script setup>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="layout">
        <Sidebar v-if="route.path !== '/login'" />

        <div class="main">
            <Header v-if="route.path !== '/login'" />
            
           <RouterView />
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
}

.main {
    flex: 1;
    padding: 24px 32px;
    box-sizing: border-box;
}
</style>