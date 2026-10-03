<script setup>
import { ref, computed } from 'vue';
import { Pencil, Trash2, Check } from 'lucide-vue-next';
const props = defineProps({
    search: {
        type: String,
        default: ''
    },
    data: {
        type: Array,
        default: () => []
    },
    showCompany: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['delete', 'add', 'edit'])

const editingId = ref(null)
const showEditModal = ref(false)

const editingName = ref('')
const editingEmail = ref('')
const editingCompany = ref('')
const filteredItems = computed(() => {
    const data = props.data
    
    return data.filter(item => 
        item.name.toLowerCase().includes(props.search.toLowerCase()) ||
        item.email.toLowerCase().includes(props.search.toLowerCase()) ||
        (item.company || '').toLowerCase().includes(props.search.toLowerCase())
    )
})

function deleteItem(id) {
    emit('delete', id)
}

function addItem(name, email, company, password) {
    if (name && email) {
        const newItem = {
            id: props.data.length 
                ? Math.max(...props.data.map(item => item.id)) + 1
                : 1,
            name: name,
            email: email,
            password: password
        }

        if (company) {
            newItem.company = company
        }

        emit('add', newItem)
    }
}

defineExpose({
    addItem
})

function editItem(id) {
    const item = props.data.find(item => item.id === id)

    if (item) {
        editingId.value = id
        editingName.value = item.name
        editingEmail.value = item.email
        editingCompany.value = item.company || ''

        showEditModal.value = true
    }
}

function saveItem() {
    const item = props.data.find(item => item.id === editingId.value)
    if (item) {
        const updatedItem ={
            ...item,
            name: editingName.value,
            email: editingEmail.value,
            company: editingCompany.value
        }

        emit('edit', updatedItem)
    }

    editingId.value = null
    showEditModal.value = false
}
</script>

<template>
    <table class="data-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Ism</th>
                <th>Email</th>
                <th v-if="showCompany">Kompaniya</th>
                <th>Tugmalar</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in filteredItems" :key="item.id">

                <td>{{ item.id }}</td>
                
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>

                <td v-if="showCompany">{{ item.company || '' }}</td>

                <td>
                    <button class="edit-button" title="Tahrirlash" @click="editItem(item.id)"><Pencil :size="16" /></button>
                    <button class="delete-button" title="O'chirish" @click="deleteItem(item.id)"><Trash2 :size="16" /></button>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="showEditModal" class="modal-overlay">
        <div class="modal">
            <h3>Foydalanuvchi o'zgartirish</h3>

            <label>Ism</label>
            <input type="text" v-model="editingName" />

            <label>Email</label>
            <input type="email" v-model="editingEmail" />

            <label>Kompaniya</label>
            <input type="text" v-model="editingCompany" />

            <div class="modal-buttons">

                <button type="button" @click="showEditModal = false">
                    Bekor qilish
                </button>

                <button type="button" @click="saveItem">O'zgartirish</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.data-table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    font-size: 13px;
}

.data-table th,
.data-table td {
    height: 36px;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    text-align: left;
    font-size: 14px;
    box-sizing: border-box;
}

.data-table th {
    background: #f8fafc;
    font-weight: 600;
}

.data-table button {
    border: 1px solid #d1d5db;
    border-radius: 5px;
    padding: 5px 10px;
    background: white;
    cursor: pointer;
    font-size: 13px;
    margin-right: 4px;
}

.edit-button,
.save-button,
.delete-button {
    border: none !important;
    background: transparent !important;
    padding: 4px !important;
    margin-right: 8px;
    cursor: pointer;
}

.edit-button {
    color: #22c55e;
}

.save-button {
    color: #22c55e;
}

.delete-button {
    color: #ef4444;
}

.edit-button:hover,
.save-button:hover {
    color: #16a34a;
}

.delete-button:hover {
    color: #dc2626;
}

.data-table button:hover {
    background: #f3f4f6;
}

.data-table tbody tr:hover {
    background: #f8fafc;
}

.data-table th:first-child,
.data-table td:first-child {
    width: 60px;
}

.data-table th:last-child,
.data-table td:last-child {
    width: 150px;
}

.data-table th:nth-child(2),
.data-table td:nth-child(2) {
    width: 22%;
}

.data-table th:nth-child(3),
.data-table td:nth-child(3) {
    width: 32%;
}

.data-table th:nth-child(4), 
.data-table td:nth-child(4) {
    width: 18%;
}

.data-table td:last-child {
    white-space: nowrap;
    vertical-align: middle;
}

.edit-button,
.save-button,
.delete-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-right: 10px;
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
    background: #ffffff;
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

input {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    margin-bottom: 14px;
    border: 1px solid #d5dbe3;
    border-radius: border-box;
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

.modal-buttons button:hover {
    background: #1d4ed8;
}
</style>