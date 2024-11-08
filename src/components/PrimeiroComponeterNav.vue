<template>
     <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Menu</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="telaprincipal" href="#">Home </a>
          </li>

          <li class="nav-item">
            <select v-model="filterOcupacao" class="form-select text-white bg-dark" aria-label="Chamados Ti" @change="atualizarFiltro"
              @click="chamadosTi">
              <option value="TODOS" selected>Todos os Chamados</option>
              <option value="ESTUDANTE">Alunos</option>
              <option value="DOCENTE">Docentes</option>
              <option value="MANUTENCAO">Manuteção</option>
              <option value="TI">Técnico de TI</option>
              <option value="NOA">ADM</option>
            </select>
          </li>

         

          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarCadastro" to="#">Novo Cadastro</a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarSala" href="#">
              Cadastra sala
            </a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarTabela" href="#">Tabela de usuários</a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostraTabelasalascadasatradas" href="#">
              Tabela de salas
            </a>
          </li>
        </ul>
        <!-- Botão de Logout -->
        <div class="mt-4 pt-2 border-top">
  <button @click="logout" class="btn btn-danger w-100 custom-logout-button">Sair</button>
</div>


      </div>
</div>

</div>
</template>