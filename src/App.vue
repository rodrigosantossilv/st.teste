<template>
  <!-- Cabeçalho -->
  <header class="bg-primary text-white p-3">
  </header>

  <!-- Estrutura principal com o Dashboard e Kanban -->
  <div class="d-flex">
    <!-- Sidebar (Dashboard) -->
    <div class="sidebar bg-secondary text-white p-3">
      <h2>Menu</h2>
      <ul class="nav flex-column">
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteHome'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteHome')" href="#">Home</a>
        </li>
        <li class="nav-item">
          <select v-model="filterOcupacao" class="form-select text-white bg-dark" @change="atualizarFiltro">
            <option value="TODOS">Todos os Chamados</option>
            <option value="ESTUDANTE">Alunos</option>
            <option value="DOCENTE">Docentes</option>
            <option value="NOA">ADM</option>
          </select>
        </li>
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteKaban'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteKaban')" href="#">Kanban</a>
        </li>
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteCadastro'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteCadastro')" href="#">Cadastro usuário</a>
        </li>
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteControleSala'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteControleSala')" href="#">Cadastrar Sala</a>
        </li>
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteControleUsuario'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteControleUsuario')" href="#">Controle de Usuários</a>
        </li>
      </ul>
      
      <!-- Botão de Logout -->
      <div class="mt-4 pt-2 border-top">
        <button @click="logout" class="btn btn-danger w-100 custom-logout-button">Sair</button>
      </div>
    </div>

    <!-- Conteúdo dinâmico (componente selecionado) -->
    <div class="content-container p-3">
      <component :is="selectedComponent" :filterOcupacao="filterOcupacao" />
    </div>
  </div>
</template>

<script>
import "./assets/global.css";
import ComponenteCadastro from './components/ComponenteCadastro.vue';
import ComponenteControleSala from './components/ComponenteControleSala.vue';
import ComponenteHome from './components/ComponenteHome.vue';
import ComponenteControleUsuario from './components/ComponenteControleUsuario.vue';
import ComponenteKaban from './components/ComponenteKaban.vue';

export default {
  name: 'App',
  components: {
    ComponenteHome,
    ComponenteKaban,
    ComponenteCadastro,
    ComponenteControleSala,
    ComponenteControleUsuario
  },
  data() {
    return {
      selectedComponent: 'ComponenteHome',  // Componente inicial
      filterOcupacao: 'TODOS'
    };
  },
  methods: {
    setComponent(componentName) {
      this.selectedComponent = componentName;
    },
    atualizarFiltro() {
      console.log(`Filtro Atualizado: ${this.filterOcupacao}`);
    },
    logout() {
      console.log('Logout efetuado');
    }
  }
};
</script>

<style>
.sidebar {
  width: 250px;
  height: 100vh;
}
.content-container {
  flex: 1;
  padding: 20px;
}
.custom-logout-button {
  font-weight: bold;
}
.nav-item.active .nav-link {
  background-color: #0d6efd; /* Cor de destaque para o item ativo */
}
</style>
