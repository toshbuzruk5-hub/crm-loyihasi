<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
}
</script>

<template>
    <div class="sidebar">
        <h2>CRM</h2>
        <router-link to="/users">Foydalanuvchilar</router-link>
        <router-link to="/companies">Kompaniyalar</router-link>
        <router-link to="/customers">Mijozlar</router-link>

        <button @click="logout">Chiqish</button>
    </div>
</template>

<style scoped>
.sidebar {
    width: 220px;
    height: 100vh;
    background: #f4f4f4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.sidebar a {
    text-decoration: none;
    color: black;
}

.sidebar button {
    width: fit-content;
    margin-top: 20px;
}
</style>