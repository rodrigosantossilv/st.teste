<template>
  <!-- Cabeçalho  rapaz-->
  <header class="bg-primary text-white p-3">
    <!-- Cabeçalho -->
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
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteKaban'}">
          <select v-model="filterOcupacao" class="form-select text-white bg-dark" @change="atualizarFiltro">
            <option value="TODOS">Todos os Chamados</option>
            <option value="ESTUDANTE">Alunos</option>
            <option value="DOCENTE">Docentes</option>
            <option value="NOA">ADM</option>
          </select>
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
        <li class="nav-item" :class="{'active': selectedComponent === 'ComponenteCadastroEquipamentos'}">
          <a class="nav-link text-white" @click="setComponent('ComponenteCadastroEquipamentos')" href="#">Cadastro de equipamentos</a>
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
import ComponenteHome from './ComponenteHome.vue';
import ComponenteKaban from './ComponenteKaban.vue';
import ComponenteCadastro from './ComponenteCadastro.vue';
import ComponenteControleSala from './ComponenteControleSala.vue';
import ComponenteControleUsuario from './ComponenteControleUsuario.vue';

export default {

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
      // Ao alterar o filtro, mudamos o componente para 'ComponenteKaban'
      this.selectedComponent = 'ComponenteKaban';
    },
    logout() {
      console.log('Logout efetuado');
      localStorage.removeItem('authToken');
      this.$router.push('/login'); // Redireciona para a página de login
    }
  }
};
</script>
<style>
.sidebar {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #0d6efd !important; /* Força a cor azul */
  color: rgb(172, 160, 160);
}

.content-container {
  margin-left: 250px;
  flex: 1;
  padding: 20px;
}

.custom-logout-button {
  font-weight: bold;
}

.nav-item.active .nav-link {
  background-color: #0654e6; /* Cor de destaque para o item ativo */
}

/* Remova ou ajuste a classe .bg-secondary para não interferir */
.bg-secondary {
    background-color: #0d6efd !important;
    color: white;
}

.sidebar h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.sidebar .nav-item {
  margin: 10px 0;
}

.sidebar .nav-link {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.sidebar .nav-link:hover {
  background-color: #043c61;
}

/* Responsividade para Sidebar */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 400px;
    top: 0;
    height: 100%;
    z-index: 1000;
    transform: translateX(0);
  }

  .sidebar.active {
    transform: translateX(450px);
  }
}
</style>

