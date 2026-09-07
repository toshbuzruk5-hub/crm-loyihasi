<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

function Login() {
    const savedUsers = localStorage.getItem('users');

    if (savedUsers) {
        const users = JSON.parse(savedUsers);

        const user = users.find(
        item =>
            item.email === email.value &&
            item.password === password.value
        );

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/users');
        } else {
           alert("Email yoki parol noto'g'ri");
        }
    }
}
</script>

<template>
    <div>
        <h1>Login</h1>

        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Parol" v-model="password" />

        <button @click="Login">Kirish</button>
    </div>
</template>