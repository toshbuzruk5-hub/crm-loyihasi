<script setup>
import { ref, watch, onMounted } from 'vue';
import DataTable from '../components/DataTable.vue';
import SearchBar from '../components/SearchBar.vue';
const dataTable = ref(null);

const search = ref('');

const userName = ref('');
const userEmail = ref('');
const userCompany = ref('');
const userPassword = ref('');

const modalUserName = ref('');
const modalUserEmail = ref('');
const modalUserCompany = ref('');
const modalUserPassword = ref('');

const showModal = ref(false);
const editingUser = ref(null);

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
    userName.value = '';
    userEmail.value = '';
    userCompany.value = '';
    userPassword.value = '';

    editingUser.value = null;
    showModal.value = true;
}


function saveUser() {
    if (!userName.value || !userEmail.value) {
        return;
    }

    const newUser = {
        id: users.value.length
            ? Math.max(...users.value.map(user => user.id)) + 1
            : 1,
        name: userName.value,
        email: userEmail.value,
        company: userCompany.value
    };

    users.value.push(newUser);

    userName.value = '';
    userEmail.value = '';
    userCompany.value = '';
    userPassword.value = '';

    showModal.value = false;
}

function deleteUser(id) {
    users.value = users.value.filter(
        user => user.id !== id);
}

function addUserToList(user) {
    users.value.push(user);
}

function editUser(user) {
    editingUser.value = user;

    userName.value = user.name;
    userEmail.value = user.email;
    userCompany.value = user.company || '';
    userPassword.value = '';

    showModal.value = true;
}
</script>

<template>
    <div class="page-header">

        <h2 class="page-title">Foydalanuvchilar</h2>
        <button class="add-user-button" @click="addUser">Foydalanuvchi qo'shish</button>
    </div>
<SearchBar 
    v-model:search="search"
    v-model:userName="userName"
    v-model:userEmail="userEmail"
    v-model:userPassword="userPassword"
    v-model:userCompany="userCompany"
    :companies="companies"
    @add-user="addUser" />

      <DataTable ref="dataTable" :search="search" :data="users" :show-company="true"
      @add="addUserToList" @delete="deleteUser" @edit="editUser" />

      <div v-if="showModal" class="modal-overlay">
        <div class="modal">

            <h3>Foydalanuvchi qo'shish</h3>
            <label>Ism</label>
            <input type="text" v-model="modalUserName" />

            <label>Email</label>
            <input type="email" v-model="modalUserEmail" />

            <label>Parol</label>
            <input type="password" v-model="modalUserPassword" />

            <label>Kompaniya</label>
            <select v-model="modalUserCompany">
                <option value="Kompaniyani tanlang"></option>

                <option v-for="company in companies" :key="company" :value="company">
                    {{ company }}
                </option>
            </select>

            <div class="modal-buttons">
                <button type="button" @click="showModal = false">Bekor qilish</button>
                <button type="button" @click="saveUser">Qo'shish</button>
            </div>
        </div>
      </div>
</template>

<style scoped>
.page-title {
    margin: 24px 0 14px;
    font-size: 20px;
    font-weight: 600;
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 24px 0 14px;
}

.page-header .page-title {
    margin: 0;
}

.add-user-button {
    height: 40px;
    padding: 0 18px;
    border: none;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-size: 14px;
    cursor: pointer;
}

.add-user-button:hover {
    background: #1d4ed8;
}
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 360px;
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal h3 {
    margin: 0 0 20px;
    text-align: center;
    font-size: 16px;
}

.modal label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
}

.modal input,
.modal select {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    margin-bottom: 14px;
    border: 1px solid #d5dbe3;
    border-radius: 4px;
    box-sizing: border-box;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.modal-buttons button {
    height: 34px;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}
</style>