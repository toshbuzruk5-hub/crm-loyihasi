<script setup>
import { ref, watch, onMounted } from 'vue';
import DataTable from '../components/DataTable.vue';

const dataTable = ref(null);

const search = ref('');

const userName = ref('');
const userEmail = ref('');
const userCompany = ref('');

const userPassword = ref('');
const companies = ref([
    'Google',
    'Microsoft',
    'Apple'
    ]);

const defaultUsers = [
    {
        id: 1,
        name: 'Buzruk Blogger',
        email: 'buzruk@gmail.com'
    },
    {
        id: 2,
        name: 'Dasturchi Pro',
        email: 'dasturchiPro@gmail.com'
    },
    {
        id: 3,
        name: 'Admin',
        email: 'admin@gmail.com'
    },
    {
        id: 4,
        name: 'Ali',
        email: 'ali@gmail.com'
    }
];

const users = ref([]);

onMounted(() => {
    const savedUsers = localStorage.getItem('users');

    if (savedUsers) {
        users.value = JSON.parse(savedUsers);
    } else {
        users.value = defaultUsers;
    }
});

watch(
    users,
    (newUsers) => {
        localStorage.setItem('users', JSON.stringify(newUsers));
    },
    { deep: true }
);
function addUser() {
    dataTable.value.addItem(userName.value, 
        userEmail.value, userCompany.value, userPassword.value);

    userName.value = '';
    userEmail.value = '';
    userCompany.value = '';
    userPassword.value = '';
}

function deleteUser(id) {
    users.value = users.value.filter(
        user => user.id !== id);
}

function addUserToList(user) {
    users.value.push(user);
}

function editUser(user) {
    const index = users.value.findIndex(
        item => item.id === user.id
    )

    if (index !== -1) {
        users.value[index] = user
    }
}
</script>

<template>
    <div>

        <div class="top-bar">
            <input type="text" placeholder="Qidirish..." v-model="search" />
            <input type="text" placeholder="Foydalanuvchi ismi" v-model="userName" />
            <input type="email" placeholder="Email" v-model="userEmail" />
            <input type="password" placeholder="Parol" v-model="userPassword" />

 <select v-model="userCompany">
            <option value="">Kompaniyani tanlang</option>

            <option v-for="company in companies" :key="company" :value="company">{{ company }}</option>
        </select>

            <button @click="addUser">Foydalanuvchi qo'shish</button>
        </div>

      <h2>Foydalanuvchilar</h2>
      
      <DataTable ref="dataTable" :search="search" :data="users" :show-company="true"
      @add="addUserToList" @delete="deleteUser" @edit="editUser" />
    </div>
</template>