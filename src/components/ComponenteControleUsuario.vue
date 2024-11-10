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
          <tr v-for="usuario in usuariosFiltrados" :key="usuario.email">
            <td data-label="Nome">{{ usuario.nome }}</td>
            <td data-label="Email">{{ usuario.email }}</td>
            <td data-label="Ações">
              <button class="btn btn-warning btn-sm">Editar</button>
              <button class="btn btn-danger btn-sm">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ComponenteControleUsuario",
  data() {
    return {
      mostrarTabelaExibida: true,
      filtro: "",
      usuarios: [
        { nome: "João Silva", email: "joao@example.com" },
        { nome: "Maria Oliveira", email: "maria@example.com" }
      ]
    };
  },
  computed: {
    usuariosFiltrados() {
      return this.usuarios.filter((usuario) => {
        return (
          usuario.nome.toLowerCase().includes(this.filtro.toLowerCase()) ||
          usuario.email.toLowerCase().includes(this.filtro.toLowerCase())
        );
      });
    }
  }
};
</script>
