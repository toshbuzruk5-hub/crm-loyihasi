<script setup>
import { ref, watch } from 'vue';
import DataTable from '../components/DataTable.vue';
import { Pencil, Trash2 } from 'lucide-vue-next';

const companyName = ref('');
const companyEmail = ref('');

const companyPassword = ref('');
const showModal = ref(false);
const editingCompany = ref(null);

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
    JSON.parse(localStorage.getItem('companies')) || defaultCompanies
)

function closeModal() {
    showModal.value = false
}
function addCompany() {
    companies.value.push({ id: Date.now(), name: companyName.value, email: companyEmail.value})

    companyName.value = ''
    companyEmail.value = ''
    companyPassword.value = ''

    showModal.value = false
}

function deleteCompany(id) {
    companies.value = companies.value.filter(
       company => company.id !== id 
    )
}

function editCompany(company) {
    editingCompany.value = company

    companyName.value = company.name
    companyEmail.value = company.email
    companyPassword.value = ''

    showModal.value = true
}

function saveEditCompany() {
    const index = companies.value.findIndex(
        item => item.id === editingCompany.value.id
    )

    if (index !== -1) {
        companies.value[index] = {
            ...companies.value[index],
            name: companyName.value,
            email: companyEmail.value
        }
    }

    companyName.value = ''
    companyEmail.value = ''
    companyPassword.value = ''
    editingCompany.value = null
    showModal.value = false
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
        <h1 class="page-title">Kompaniyalar</h1>

        <div class="top-bar">

        <input type="text" placeholder="Qidirish..." v-model="search" />
        <input type="text" placeholder="Kompaniya nomi" v-model="companyName">
        <input type="email" placeholder="Email" v-model="companyEmail">

        <button @click="showModal = true">Kompaniya qo'shish</button>

    </div>
        <table class="companies-table">
            <thead>
                <tr>
                    <th>Kompaniya nomi</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>So'nggi tashrif</th>
                    <th>Tugmalar</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="company in companies" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td>{{ company.email }}</td>
                    <td>{{ company.phone || '-' }}</td>
                    <td>-</td>
                    
                    <td>
                        <button class="edit-button" @click="editCompany(company)"><Pencil :size="17" /></button>
                        <button class="delete-button" @click="deleteCompany(company.id)"><Trash2 :size="17" /></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
        <div class="modal">

            <h3> {{ editingCompany ? "Kompaniya o'zgartirish" : "Kompaniya qo'shish" }}</h3>

            <label>Nomi</label>
            <input type="text" v-model="companyName" placeholder="Kompaniya nomi" />

            <label>Email</label>
            <input type="email" v-model="companyEmail" placeholder="Email" />

            <label>Parol</label>
            <input type="password" v-model="companyPassword" placeholder="Parol" />

            <div class="modal-buttons">
                <button @click="closeModal">Bekor qilish</button>
                
                <button @click="editingCompany ? saveEditCompany() : addCompany()">
                    {{ editingCompany ? "Saqlash" : "Qo'shish" }}
                </button>
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
.top-bar button {
    height: 38px;
    box-sizing: border-box;
}

.top-bar input {
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

.top-bar button {
    width: 150px;
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

.companies-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
    background: white;
    font-size: 13px;
}

.companies-table th,
.companies-table td {
    height: 36px;
    padding: 8px 12px;
    box-sizing: border-box;
    border: 1px solid #e5e7eb;
    text-align: left;
}

.companies-table th {
    background: #f8fafc;
    font-weight: 600;
}

.companies-table th:nth-child(1),
.companies-table td:nth-child(1) {
    width: 28%;
}

.companies-table th:nth-child(2),
.companies-table td:nth-child(2) {
    width: 25%;
}

.companies-table th:nth-child(3),
.companies-table td:nth-child(3) {
    width: 15%;
}

.companies-table th:nth-child(4),
.companies-table td:nth-child(4) {
    width: 15%;
}

.companies-table th:nth-child(5),
.companies-table td:nth-child(5) {
    width: 10%;
}

.companies-table th:nth-child(6),
.companies-table td:nth-child(6) {
    width: 12%;
}

.companies-table .edit-button,
.companies-table .delete-button {
    border: none;
    background: transparent;
    padding: 2px;
    cursor: pointer;
    box-shadow: none;
}

.companies-table .edit-button {
    color: #22c55e;
}

.companies-table .delete-button {
    color: #ef4444;
}

.companies-table .edit-button:hover,
.companies-table .delete-button:hover {
    opacity: 0.7;
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
    max-height: 90vh;
    overflow-y: auto;
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
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

.modal input {
    width: 100%;
    height: 36px;
    min-height: 36px;
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