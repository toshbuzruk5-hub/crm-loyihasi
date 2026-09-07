<script setup>
import { ref, watch } from 'vue';
import DataTable from '../components/DataTable.vue';

const dataTable = ref(null);
const search = ref('');

const customerName = ref('');
const customerEmail = ref('');
const customerCompany = ref('');

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

function addCustomer() {
    dataTable.value.addItem(
        customerName.value,
        customerEmail.value,
        customerCompany.value
    )

    customerName.value = ''
    customerEmail.value = ''
    customerCompany.value = ''
}

function deleteCustomer(id) {
    customers.value = customers.value.filter(
      customer => customer.id !== id
    )
}

function addCustomerToList(customer) {
    customers.value.push(customer)
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
    <div>
        <h1>Mijozlar</h1>

        <div class="top-bar">

        <input type="text" placeholder="Qidirish..." v-model="search" />
        <input type="text" placeholder="Mijoz ismi" v-model="customerName" />

        <input type="email" placeholder="Email" v-model="customerEmail" />

        <select v-model="customerCompany">
            <option value="">Kompaniyani tanlang</option>

            <option v-for="company in companies" :key="company" :value="company">{{ company }}</option>
        </select>
        
        <button @click="addCustomer">Mijoz qo'shish</button>

        <DataTable ref="dataTable" :data="customers" :search="search" :show-company="true"
        @delete="deleteCustomer" @add="addCustomerToList" @edit="editCustomer" />

        </div>
    </div>
</template>

