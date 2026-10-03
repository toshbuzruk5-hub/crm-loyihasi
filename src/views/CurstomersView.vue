<script setup>
import { ref, watch } from 'vue';
import DataTable from '../components/DataTable.vue';
import { Save } from 'lucide-vue-next';

const dataTable = ref(null);
const search = ref('');

const customerName = ref('');
const customerEmail = ref('');
const customerCompany = ref('');

const companies = ref(['Google', 'Microsoft', 'Apple']);
const showModal = ref(false)
const defaultCustomers = [
    {
        id: 1,
        name: 'Olim Alimov',
        email: 'olim@gmail.com'
    },
    {
        id: 2,
        name: 'Aziz Aminov',
        email: 'aziz@gmail.com'
    },
    {
        id: 3,
        name: 'Sobir',
        email: 'sobir@gmail.com'
    }
];

const customers = ref(
    JSON.parse(localStorage.getItem('customers')) || defaultCustomers
);

function openCustomerModal() {
    showModal.value = true;
}

function addCustomer() {
    const newCustomers = {
        id: customers.value.length
            ? Math.max(...customers.value.map(item => item.id)) + 1
            : 1,
        name: customerName.value,
        email: customerEmail.value,
        company: customerCompany.value
    };

    customers.value.push(newCustomers);

    customerName.value = '';
    customerEmail.value = '';
    customerCompany.value = '';

    showModal.value = false;
}
function deleteCustomer(id) {
    customers.value = customers.value.filter(
      customer => customer.id !== id
    )
}

function editCustomer(customer) {
    const index = customers.value.findIndex(
        item => item.id === customer.id
    )

    if (index !== -1) {
        customers.value[index] = customer
    }
}

watch(
    customers,
    (newCustomers) => {
        localStorage.setItem(
            'customers',
            JSON.stringify(newCustomers)
        );
    },
    { deep: true }
);
</script>

<template>
    <div class="customers-page">
        <h1 class="page-title">Mijozlar</h1>

        <div class="top-bar">

        <input type="text" placeholder="Qidirish..." v-model="search" />
        <input type="text" placeholder="Mijoz ismi" v-model="customerName" />

        <input type="email" placeholder="Email" v-model="customerEmail" />

        <select v-model="customerCompany">
            <option value="">Kompaniyani tanlang</option>

            <option v-for="company in companies" :key="company" :value="company">{{ company }}</option>
        </select>
        
        <button @click="openCustomerModal">Mijoz qo'shish</button>
    </div>
        <DataTable ref="dataTable" :data="customers" :search="search" :show-company="true"
        @delete="deleteCustomer" @edit="editCustomer" />

        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h3>Mijoz qo'shish</h3>

                <label>Ism</label>
                <input type="text" v-model="customerName" />

                <label>Email</label>
                <input type="email" v-model="customerEmail" />

                <label>Kompaniya</label>
                <select v-model="customerCompany">
                    <option value="">Kompaniyani tanlang</option>

                    <option v-for="company in companies" :key="company" :value="company">
                        {{ company }}
                    </option>
                </select>

                <div class="modal-buttons">
                    <button @click="showModal = false">
                        Bekor qilish
                    </button>

                    <button @click="addCustomer">Qo'shish</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-title {
    margin: 0 0 16px;
    font-size: 18px;
    font-weight: 600;
}

.top-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 14px;
}

.top-bar input,
.top-bar select,
.top-bar button {
    height: 38px;
    box-sizing: border-box;
}

.top-bar input,
.top-bar select {
    padding: 0 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 13px;
}

.top-bar input:nth-child(1) {
    width: 160px;
}

.top-bar input:nth-child(2) {
    width: 180px;
}

.top-bar input:nth-child(3) {
    width: 180px;
}

.top-bar select {
    width: 180px;
    background: white;
}

.top-bar button {
    width: 140px;
    padding: 0 12px;
    border: none;
    border-radius: 6px;
    background: #2563eb;
    color: white;
    font-size: 13px;
    cursor: pointer;
}

.top-bar button:hover {
    background: #1d4ed8;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgb(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 360px;
    background: white;
    padding: 24px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgb(0, 0, 0, 0.2);
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

.modal buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.modal buttons button {
    height: 34px;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    background: #2563eb;
    color: white;
    cursor: pointer;
}

</style>
