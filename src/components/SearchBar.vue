<script setup>
const search = defineModel('search')
const userName = defineModel('userName')
const userEmail = defineModel('userEmail')
const userPassword = defineModel('userPassword')
const userCompany = defineModel('userCompany')

defineProps(['companies'])

</script>

<template>
    <div class="search-bar">
        <input type="text" placeholder="Qidirish..." v-model="search" />
        <input type="text" placeholder="Foydalanuvchi ismi" v-model="userName" />
        <input type="email" placeholder="Email" v-model="userEmail" />
        <input type="password" placeholder="Parol" v-model="userPassword" />

        <select v-model="userCompany">
            <option value="">Kompaniyani tanlang</option>
            <option v-for="company in companies" :key="company" :value="company"> {{ company }}</option>
        </select>
    </div>
</template>

<style scoped>
.search-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
}

.search-bar input {
    width: 150px;
    height: 30px;
    box-sizing: border-box;
}
.search-bar select {
    width: 160px;
    height: 38px;
    box-sizing: border-box;
}

.search-bar input,
.search-bar select {
    height: 48px;
    padding: 0 12px;
    border: 1px solid #d5dbe3;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 14px;
    background: #ffffff;
}

.search-bar input::placeholder {
    color: #9ca3af;
}

.search-bar input:nth-child(1) {
    width: 150px;
}

.search-bar input:nth-child(2) {
    width: 160px;
}

.search-bar input:nth-child(3) {
    width: 150px;
}

.search-bar input:nth-child(4) {
    width: 150px;
}

.search-bar select {
    width: 175px;
}
.search-bar button {
    min-width: 160px;
    height: 40px;
    padding: 0 18px;
    border: none;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
}

.search-bar button:hover {
    background: #1d4ed8;
}
</style>