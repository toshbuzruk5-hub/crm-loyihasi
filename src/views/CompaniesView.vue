<script setup>
import { ref, watch } from 'vue';
import DataTable from '../components/DataTable.vue';

const companyName = ref('');
const companyEmail = ref('');

const search = ref('');
const dataTable = ref(null);

const defaultCompanies = [
    {
        id: 1,
        name: 'Google',
        email: 'google@gmail.com'
    },
    {
        id: 2,
        name: 'Microsoft',
        email: 'microsoft@gmail.com'
    },
    {
        id: 3,
        name: 'Apple',
        email: 'apple@gmail.com'
    }
]

const companies = ref(
    JSON.parse(localStorage.getItem('customers')) || defaultCustomers
)

function addCompany() {
    dataTable.value.addItem(companyName.value, companyEmail.value)

    companyName.value = ''
    companyEmail.value = ''
}

function deleteCompany(id) {
    companies.value = companies.value.filter(
       company => company.id !== id 
    )
}

function editCompany(company) {
    const index = companies.value.findIndex(
        item => item.id === company.id
    )

    if (index !== -1) {
        companies.value[index] = company
    }
}

function addCompanyToList(company) {
    companies.value.push(company)
}

watch(
    companies,
    (newCompanies) => {
        localStorage.setItem(
            'companies',
            JSON.stringify(newCompanies)
        )
    },
    { deep: true }
)
</script>

<template>
    <div>
        <h1>Kompaniyalar</h1>

        <div class="top-bar">

        <input type="text" placeholder="Qidirish..." v-model="search" />
        <input type="text" placeholder="Kompaniya nomi" v-model="companyName">
        <input type="email" placeholder="Email" v-model="companyEmail">

        
        <button @click="addCompany">Kompaniya qo'shish</button>

        <DataTable ref="dataTable" :data="companies" :search="search" @add="addCompanyToList" 
            @delete="deleteCompany" @edit="editCompany" />
        </div>
    </div>
</template>