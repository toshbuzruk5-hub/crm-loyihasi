<script setup>
import { useRouter } from "vue-router";
import { Users, Building2, UserRound, LogOut} from "lucide-vue-next";

const router = useRouter();

function logout() {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
}
</script>

<template>
    <div class="sidebar">
        <h2>CRM</h2>
        <router-link class="nav-link" to="/users"><Users :size="18" />Foydalanuvchilar</router-link>
        <router-link class="nav-link" to="/companies"><Building2 :size="18" />Kompaniyalar</router-link>
        <router-link class="nav-link" to="/customers"><UserRound :size="18" />Mijozlar</router-link>

        <button class="logout-button" @click="logout"><LogOut :size="18" />Chiqish</button>
    </div>
</template>

<style scoped>
.sidebar {
    width: 280px;
    height: 100vh;
    background: #ffffff;
    padding: 24px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.sidebar a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #333;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
}


.sidebar .nav-link {
    dislay: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    margin-bottom: 4px;
}

.sidebar a:hover {
    background: #f1f5f9;
}

.sidebar .router-link-active {
    background: #f1f5f9;
    color: #333;
}
.sidebar button {
    margin-top: auto;
    padding: 10px 12px;
    border: none;
    border-radius: 8px;
    background: #f3f4f6;
    color: #111827;
    cursor: pointer;
    font-size: 14px;
}

.logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.sidebar h2 {
    margin: 8px 0 24px;
    font-size: 18px;
    font-weight: 600;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    box-sizing: border-box;
}

.nav-link svg {
    flex-shrink: 0;
}
</style>