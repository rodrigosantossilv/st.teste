<template>  
  <!-- Formulário para cadastro de sala -->
  <div v-if="mostrarCadastroSala" class="table-container p-3">
    <form @submit.prevent="adicionarSala" class="mb-4">
      <h2>Cadastrar Salas</h2>
      <div class="form-group">
        <label for="bloco">Bloco da sala</label>
        <input type="text" id="bloco" v-model="novoBloco" placeholder="Digite o bloco" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="nome">Nome da sala</label>
        <input type="text" id="nome" v-model="novoNome" placeholder="Digite o nome da sala" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="numero">Número da sala</label>
        <input type="number" id="numero" v-model="novoNumero" placeholder="Digite o número da sala" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Adicionar Sala</button>
    </form>
    
    <h2>Pesquisa de salas cadastradas</h2>
    <input type="text" v-model="filtroPesquisa" placeholder="Pesquisar por salas ou laboratórios cadastrados" class="form-control mb-3" />
  </div>

  <div v-if="mostrarTabelaSalas" class="table-container p-3">
    <h2>Tabela de salas cadastradas</h2>
    <input type="text" v-model="filtroPesquisa" placeholder="Pesquisa por salas ou laboratórios cadastrados" class="form-control mb-3" />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Bloco</th>
          <th>Número da sala</th>
          <th>Nome da sala</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sala in salasFiltradas" :key="sala.id">
          <td data-label="Bloco">{{ sala.bloco }}</td>
          <td data-label="Número da sala">{{ sala.numero }}</td>
          <td data-label="Nome da sala">{{ sala.nome }}</td>
          <td data-label="Ações">
            <button class="btn btn-warning btn-sm" @click="editarSala(sala)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="removerSala(sala.id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ComponenteControleUsuario',
  data() {
    return {
      mostrarCadastroSala: true,
      mostrarTabelaSalas: true,
      novoBloco: '',
      novoNome: '',
      novoNumero: '',
      filtroPesquisa: '',
      salas: [],
      salaEmEdicao: null,
    };
  },
  computed: {
    salasFiltradas() {
      return this.salas.filter((sala) => {
        return (
          sala.nome.toLowerCase().includes(this.filtroPesquisa.toLowerCase()) ||
          sala.bloco.toLowerCase().includes(this.filtroPesquisa.toLowerCase()) ||
          String(sala.numero).includes(this.filtroPesquisa)
        );
      });
    },
  },
  methods: {
    adicionarSala() {
      if (this.salaEmEdicao) {
        // Edição de uma sala existente
        Object.assign(this.salaEmEdicao, {
          bloco: this.novoBloco,
          nome: this.novoNome,
          numero: this.novoNumero,
        });
        this.salaEmEdicao = null;
      } else {
        // Adição de uma nova sala
        const novaSala = {
          id: Date.now(),
          bloco: this.novoBloco,
          nome: this.novoNome,
          numero: this.novoNumero,
        };
        this.salas.push(novaSala);
      }
      this.resetarFormulario();
    },
    editarSala(sala) {
      this.salaEmEdicao = sala;
      this.novoBloco = sala.bloco;
      this.novoNome = sala.nome;
      this.novoNumero = sala.numero;
    },
    removerSala(id) {
      this.salas = this.salas.filter((sala) => sala.id !== id);
    },
    resetarFormulario() {
      this.novoBloco = '';
      this.novoNome = '';
      this.novoNumero = '';
    },
  },
};
</script>

<style scoped>
.table-container {
  margin: 20px;
}
</style>
