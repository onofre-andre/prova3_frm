<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Está Logado: {{ isLogged }}</v-app-bar-title>
      <v-btn v-if="isLogged" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main class="align-center justify-center">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const isLogged = ref(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          isLogged.value = true;
        } else {
          isLogged.value = false;
          if (route.name !== "Login") {
            router.push({ name: "Login" }); // Redireciona para a rota de login ao fazer logout
          }
        }
      });
    });

    const logout = () => {
      getAuth()
        .signOut()
        .then(() => {
          console.log("Deslogado");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      isLogged,
      logout,
    };
  },
};
</script>

