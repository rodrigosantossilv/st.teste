<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Opções</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="home" href="#">Home</a>
          </li>

          <li class="nav-item">
            <select v-model="filterOcupacao" class="form-select text-white bg-dark" aria-label="Chamados Ti" @change="atualizarFiltro" @click="chamadosTi">
              <option value="TODOS" selected>Todos os Chamados</option>
              <option value="ESTUDANTE">Alunos</option>
              <option value="DOCENTE">Docentes</option>
              <option value="MANUTENCAO">Manutenção</option>
              <option value="TI">Técnico de TI</option>
              <option value="NOA">ADM</option>
            </select>
          </li>
        </ul>
      </div>

      <!-- TABELAS DO KANBAN-->
      <div v-show="mostrarTodosChamados || categoriaVisivel === 'Análise'" id="Análise" class="kanban-column" @drop="drop($event)" @dragover="allowDrop($event)">
        <h3 class="kanban-header bg-secondary text-white p-2 text-center">Análise</h3>
        <div v-for="chamado in chamadosAnalise" :key="chamado.id" class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
          <p><strong>Gmail:</strong> {{ chamado.email }}</p>
          <p><em>Ocupação:</em> {{ chamado.ocupacao }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Máquina:</em> {{ chamado.maquinas.join(", ") }}</p>
          <button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>
        </div>
      </div>

      <div v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'" id="Pendentes" class="kanban-column" @drop="drop($event)" @dragover="allowDrop($event)">
        <h3 class="kanban-header bg-danger text-white p-2 text-center">Pendente</h3>
        <div v-for="chamado in chamadosPendentes" :key="chamado.id" class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
          <p><strong>Gmail:</strong> {{ chamado.email }}</p>
          <p><em>Ocupação:</em> {{ chamado.ocupacao }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Máquina:</em> {{ chamado.maquinas.join(", ") }}</p>
        </div>
      </div>

      <div v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'" id="Em Andamento" class="kanban-column" @drop="drop($event)" @dragover="allowDrop($event)">
        <h3 class="kanban-header bg-primary text-white p-2 text-center">Andamento</h3>
        <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
          <p><strong>Gmail:</strong> {{ chamado.email }}</p>
          <p><em>Ocupação:</em> {{ chamado.ocupacao }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Máquina:</em> {{ chamado.maquinas.join(", ") }}</p>
        </div>
      </div>

      <div v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'" id="Concluido" class="kanban-column" @drop="drop($event)" @dragover="allowDrop($event)">
        <h3 class="kanban-header bg-success text-white p-2 text-center">Concluído</h3>
        <div v-for="chamado in chamadosConcluidos" :key="chamado.id" class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
          <p><strong>Gmail:</strong> {{ chamado.email }}</p>
          <p><em>Ocupação:</em> {{ chamado.ocupacao }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Máquina:</em> {{ chamado.maquinas.join(", ") }}</p>
          <button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ROLES } from "../util/roles";

export default {
  data() {
    return {
      filterOcupacao: "TODOS",
      ROLES,
      role: null,
      chamadosAnalise: [],
      chamadosAndamento: [],
      chamadosConcluidos: [],
      chamadosPendentes: [],
      chamados: [],
      categoriaVisivel: null,
      mostrarTodosChamados: true,
      mostrarFormulario: false,
      mostrarChamadosManutençao: false,
      mostrarTabelaExibida: false,
      mostrarCadastrosala: false,
      novoSala: {
        bloco: '', 
        numerodasala: '',
        nomedasala: ''
      },
    };
  },
  mounted() {
    this.carregarChamados();
    this.atualizarChamados();
    this.role = localStorage.getItem("role");
  },
  async atualizarFiltro() {
    await this.carregarChamados();
    this.categoriaVisivel = null;
    this.mostrarTodosChamados = true;
  },
  async carregarChamados() {
    try {
      const token = localStorage.getItem("token");
      const resposta = await axios.get('http://localhost:3000/chamados', {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.chamados = resposta.data;
      this.chamados = this.filterOcupacao !== "TODOS" ? this.chamados.filter(chamado => chamado.ocupacao === this.filterOcupacao) : this.chamados;

      this.chamadosAnalise = this.chamados.filter(chamado => chamado.status === "Análise");
      this.chamadosAndamento = this.chamados.filter(chamado => chamado.status === "Em Andamento");
      this.chamadosConcluidos = this.chamados.filter(chamado => chamado.status === "Concluído");
      this.chamadosPendentes = this.chamados.filter(chamado => chamado.status === "Pendente");
    } catch (error) {
      console.error("Erro ao carregar chamados:", error);
    }
  },
  methods: {
    async confirmarRemocao(id) {
      try {
        const response = await Swal.fire({
          title: 'Tem certeza?',
          text: 'Você não poderá reverter essa ação!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, remover!',
          cancelButtonText: 'Cancelar'
        });

        if (response.isConfirmed) {
          await axios.delete(`http://localhost:3000/chamados/${id}`);
          this.carregarChamados(); // Recarrega os chamados após remoção
        }
      } catch (error) {
        console.error("Erro ao remover chamado:", error);
      }
    },

    drag(event, chamado) {
      event.dataTransfer.setData("chamadoId", chamado.id);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    drop(event) {
      event.preventDefault();
      const chamadoId = event.dataTransfer.getData("chamadoId");
      const chamado = this.chamados.find(ch => ch.id === chamadoId);

      if (chamado) {
        chamado.status = this.getStatusByColumn(event.target.id);
        this.atualizarStatusChamado(chamado);
      }
    },

    getStatusByColumn(columnId) {
      const statusMap = {
        'Análise': 'Análise',
        'Pendentes': 'Pendente',
        'Em Andamento': 'Em Andamento',
        'Concluido': 'Concluído'
      };
      return statusMap[columnId] || 'Análise';
    },

    async atualizarStatusChamado(chamado) {
      try {
        await axios.put(`http://localhost:3000/chamados/${chamado.id}`, chamado);
        this.carregarChamados(); // Recarrega os chamados após atualização
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
      }
    },
  }
};
</script>
