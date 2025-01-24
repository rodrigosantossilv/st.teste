<template>
  <div v-if="mostrarTabelaExibida" class="table-container p-3">
    <h2>Tabela de Usuários</h2>
    <input
      type="text"
      v-model="filtro"
      placeholder="Pesquisa por nome ou email"
      class="form-control mb-3"
    />
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosFiltrados" :key="usuario.id">
            <td data-label="Nome">{{ usuario.nome_completo }}</td>
            <td data-label="Email">{{ usuario.email }}</td>
            <td data-label="Ações">
              <button class="btn btn-warning btn-sm" @click="buscarUsuario(usuario.id)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="removerUsuario(usuario.id)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Formulário de Edição -->
    <div v-if="usuarioParaEditar" class="edit-form mt-4">
      <h3>Editar Usuário</h3>
      <form @submit.prevent="atualizarUsuario">
        <div class="form-group">
          <label>Nome</label>
          <input type="text" v-model="usuarioParaEditar.nome_completo" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="usuarioParaEditar.email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary mt-2">Salvar Alterações</button>
      </form>
    </div>

    <!-- Mensagens de sucesso ou erro -->
    <div v-if="mensagem" class="alert" :class="mensagem.tipo">
      {{ mensagem.texto }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ComponenteControleUsuario",
  data() {
    return {
      mostrarTabelaExibida: true,
      filtro: "",
      usuarios: [],
      usuarioParaEditar: null, // Armazena o usuário selecionado para edição
      mensagem: null, // Mensagem de sucesso ou erro
    };
  },
  computed: {
    usuariosFiltrados() {
      return this.usuarios.filter((usuario) => {
        return (
          usuario.nome_completo.toLowerCase().includes(this.filtro.toLowerCase()) ||
          usuario.email.toLowerCase().includes(this.filtro.toLowerCase())
        );
      });
    },
  },
  methods: {
    async carregarUsuarios() {
  const token = localStorage.getItem("token");
  try {
    const resposta = await axios.get("http://localhost:3000/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.usuarios = resposta.data;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error.response || error.message);
  }
},
async buscarUsuario(id) {
  const token = localStorage.getItem("token");
  try {
    // Corrigindo a URL para adicionar uma barra entre 'usuarios' e o id
    const resposta = await axios.get(`http://localhost:3000/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.usuarioParaEditar = resposta.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
  }
},
async atualizarUsuario() {
  const token = localStorage.getItem("token");
  try {
    // Atualizando a URL para refletir o endpoint correto
    const resposta = await axios.put(`http://localhost:3000/usuarios/${this.usuarioParaEditar.id}`, this.usuarioParaEditar, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Usuário atualizado:", resposta.data);
    this.usuarioParaEditar = null; // Fecha o formulário de edição
    await this.carregarUsuarios(); // Recarrega a lista de usuários
    this.mostrarMensagem("success", "Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    this.mostrarMensagem("danger", "Erro ao atualizar o usuário.");
  }
},
async removerUsuario(id) {
  const token = localStorage.getItem("token");
  try {
    // Corrigindo a URL para refletir o endpoint correto
    await axios.delete(`http://localhost:3000/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Usuário com ID ${id} removido`);
    await this.carregarUsuarios(); // Recarrega a lista de usuários após remoção
    this.mostrarMensagem("success", "Usuário removido com sucesso!");
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    this.mostrarMensagem("danger", "Erro ao remover o usuário.");
  }
},
    mostrarMensagem(tipo, texto) {
      this.mensagem = { tipo, texto };
      setTimeout(() => {
        this.mensagem = null; // Remove a mensagem após 5 segundos
      }, 5000);
    }
  },
  mounted() {
    this.carregarUsuarios(); // Carrega todos os usuários ao montar o componente
  },
};
</script>

