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
    <div class="login-page">
        <div class="login-box">
        <h1>Login</h1>

        <input type="email" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Parol" v-model="password" />

        <button @click="Login">Kirish</button>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    box-sizing: border-box;
}

.login-box {
    width: 360px;
    padding: 32px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-sizing: border-box;
}

.login-box h1 {
    margin: 0 0 24px;
    font-size: 28px;
    font-weight: 600;
}

.login-box input {
    width: 100%;
    height: 42px;
    margin-bottom: 14px;
    padding: 0 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-sizing: border-box;
}

.login-box button {
    width: 100%;
    height: 42px;
    border: none;
    background: #2563eb;
    color: white;
    cursor: pointer;
}

.login-box button:hover {
    background: #1d4ed8;
}
</style>