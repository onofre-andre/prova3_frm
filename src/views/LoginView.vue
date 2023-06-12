<template>
  <v-container class="d-flex align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form>
          <h1>Login</h1>
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
          <v-btn color="primary" class="mr-2" @click="login">Login</v-btn>
          <v-btn color="primary" @click="google">Sign In With Google</v-btn>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const auth = getAuth();
const router = useRouter();
const errorMessage = ref('');

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      const user = auth.currentUser;
      console.log(user);
      router.push('/crud'); // Redirecionar para o CRUD após o login
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      errorMessage.value = 'Login incorreto. Verifique suas credenciais.';
    });
}

const google = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      const user = auth.currentUser;
      console.log(user);
      router.push('/crud'); // Redirecionar para o CRUD após o login
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      errorMessage.value = 'Erro ao fazer login com o Google.';
    });
}
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
}
</style>
