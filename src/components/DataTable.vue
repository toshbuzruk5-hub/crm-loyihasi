<script setup>
import { ref, computed } from 'vue';

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
}
</script>

<template>
    <table border="1">
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

                <td>
                    <input v-if="editingId === item.id" v-model="editingName" />
                    
                    <span v-else>
                        {{ item.name }}
                    </span>
                </td>
                
                <td>
                    <input v-if="editingId === item.id" v-model="editingEmail" />
                    
                    <span v-else>{{ item.email }}</span>
                
                </td>

                <td v-if="showCompany">
                    <input v-if="editingId === item.id" v-model="editingCompany" />
                    <span v-else>{{ item.company || '' }}</span>
                </td>
                <td>
                    <button @click="editItem(item.id)">Edit</button>
                    <button @click="deleteItem(item.id)">Delete</button>
                    <button v-if="editingId === item.id" @click="saveItem()">Saqlash</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>