<template>
    <div class="login-page">
        <form class="login-card" @submit.prevent="onSubmit" novalidate>
            <h1>Sign in</h1>

            <label class="field">
                <span>Email</span>
                <input
                    type="email"
                    v-model.trim="email"
                    required
                    autocomplete="username"
                    :disabled="loading"
                    autofocus
                />
            </label>

            <label class="field">
                <span>Password</span>
                <div class="pw-row">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        required
                        autocomplete="current-password"
                        :disabled="loading"
                    />
                    <button
                        type="button"
                        class="toggle-pw"
                        @click="showPassword = !showPassword"
                        :aria-pressed="showPassword.toString()"
                        :disabled="loading"
                        title="Show / hide password"
                    >
                        {{ showPassword ? 'Hide' : 'Show' }}
                    </button>
                </div>
            </label>

            <div class="actions">
                <button class="submit" type="submit" :disabled="loading || !canSubmit">
                    <span v-if="!loading">Login</span>
                    <span v-else>Signing in…</span>
                </button>
            </div>

            <p v-if="error" class="error" role="alert">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const canSubmit = computed(() => {
    return email.value.length > 0 && password.value.length > 0
})

async function onSubmit() {
    error.value = ''
    if (!canSubmit.value) {
        error.value = 'Please enter email and password.'
        return
    }

    loading.value = true
    try {
        // Replace the URL with your auth endpoint
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value }),
        })

        if (!res.ok) {
            const body = await res.json().catch(() => ({}))
            throw new Error(body.message || 'Invalid credentials')
        }

        const data = await res.json()
        // Example: store token and redirect
        if (data.token) {
            localStorage.setItem('auth_token', data.token)
        }
        // adjust destination as needed
        await router.push({ name: 'Dashboard' })
    } catch (err) {
        error.value = err.message || 'Login failed'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: #f6f8fa;
}

.login-card {
    width: 100%;
    max-width: 420px;
    background: #fff;
    padding: 1.75rem;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(20, 30, 50, 0.08);
    box-sizing: border-box;
}

.login-card h1 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
}

.field {
    display: block;
    margin-bottom: 1rem;
}

.field span {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: #333;
}

.field input {
    width: 100%;
    padding: 0.6rem 0.75rem;
    border: 1px solid #dfe7ee;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
}

.pw-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.toggle-pw {
    background: transparent;
    border: 1px solid #dfe7ee;
    padding: 0.45rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
}

.actions {
    margin-top: 0.5rem;
}

.submit {
    width: 100%;
    padding: 0.7rem;
    border: none;
    background: #2563eb;
    color: #fff;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.submit[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
}

.error {
    margin-top: 0.75rem;
    color: #b91c1c;
    font-size: 0.95rem;
}
</style>