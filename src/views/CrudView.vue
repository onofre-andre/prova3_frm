<template>
  <v-app>
    <v-card>
      <v-card-title>CRUD</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="nome"
          label="Nome"
          placeholder="Nome Completo"

        ></v-text-field>
        <v-text-field
          v-model="email"
          label="Email"
          placeholder="E-Mail"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mr-5" @click="save">Salvar</v-btn>
        <v-btn color="error" @click="cancel">Cancelar</v-btn>
      </v-card-text>
    </v-card>

    <v-row v-if="dados.length > 0">
      <v-col
        v-for="(item, index) in dados"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="ma-3">
          <v-img
            :src="'https://picsum.photos/200' + index"
            cover
            height="250px"
            max-width="250px"
            min-width="250px"
          />
          <v-card-title>{{ item.nome }}</v-card-title>
          <v-card-text>{{ item.email }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="edit(item)">Editar</v-btn>
            <v-btn color="error" @click="remove(item.id)">Remover</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      nome: "",
      email: "",
      dados: [],
      idSelecionado: null,
    };
  },
  methods: {
    cancel() {
      this.clean();
      this.idSelecionado = null;
    },
    clean() {
      this.nome = "";
      this.email = "";
    },
    save() {
      if (this.idSelecionado) {
        // Atualizar dados existentes
        this.axios
          .put(
            `https://nivel-92a82-default-rtdb.firebaseio.com/clientes/${this.idSelecionado}.json`,
            {
              nome: this.nome,
              email: this.email,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.load();
              this.cancel();
            }
          })
          .catch((error) => console.log(error));
      } else {
        // Criar novos dados
        this.axios
          .post(
            "https://nivel-92a82-default-rtdb.firebaseio.com/clientes.json",
            {
              nome: this.nome,
              email: this.email,
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.load();
              this.cancel();
            }
          })
          .catch((error) => console.log(error));
      }
    },
    load() {
      this.axios
        .get("https://nivel-92a82-default-rtdb.firebaseio.com/clientes.json")
        .then((response) => {
          this.dados = [];
          for (let key in response.data) {
            let user = response.data[key];
            user.id = key;
            this.dados.push(user);
          }
        })
        .catch((error) => console.log(error));
    },
    remove(key) {
      this.axios
        .delete(
          `https://nivel-92a82-default-rtdb.firebaseio.com/clientes/${key}.json`
        )
        .then((response) => {
          if (response.status === 200) this.load();
        })
        .catch((error) => console.log(error));
    },
    edit(item) {
      this.nome = item.nome;
      this.email = item.email;
      this.idSelecionado = item.id;
    },
  },
  beforeMount() {
    this.load();
  },
};
</script>
