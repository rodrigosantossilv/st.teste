<!-- TABELAS DO KANBAN -->

<template>
    
<div v-show="mostrarTodosChamados || categoriaVisivel === 'Analise'" id="Análise" class="kanban-column" 
@drop="drop($event)" @dragover="allowDrop($event)">
<h3 class="kanban-header bg-warning text-white p-2 text-center">
ANÁLISE
</h3>
<div v-for="chamado in chamadosAnalise" :key="chamado.id" :id="chamado.id" 
  class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
  <p><strong>Setor:</strong> {{ chamado.setor }}</p>
<p><strong>E-mail:</strong> {{ chamado.email }}</p>
<p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
<p><strong>Problema:</strong> {{ chamado.problema }}</p>
<p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
<p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
<p><strong>Sala:</strong> {{ chamado.sala }}</p>
<p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
<button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>
<div class="tags"></div>
</div>
</div>

<!-- Coluna Pendentes -->
<div v-show="mostrarTodosChamados || categoriaVisivel === 'TI'" id="Pendentes" class="kanban-column" 
@drop="drop($event)" @dragover="allowDrop($event)">
<h3 class="kanban-header bg-danger text-white p-2 text-center">
TI
</h3>
<div v-for="chamado in chamadosPendentes" :key="chamado.id" class="kanban-item bg-light p-3 my-2" 
draggable="true" @dragstart="drag($event, chamado)">
<p><strong>Setor:</strong> {{ chamado.setor }}</p>
<p><strong>E-mail:</strong> {{ chamado.email }}</p>
<p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
<p><strong>Problema:</strong> {{ chamado.problema }}</p>
<p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
<p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
<p><strong>Sala:</strong> {{ chamado.sala }}</p>
<p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
</div>
</div>

<!-- Coluna Em Andamento -->
<div v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'" id="Em Andamento" class="kanban-column" 
@drop="drop($event)" @dragover="allowDrop($event)">
<h3 class="kanban-header bg-primary text-white p-2 text-center">
MANUTENÇÃO
</h3>
<div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2" 
draggable="true" @dragstart="drag($event, chamado)">
<p><strong>Setor:</strong> {{ chamado.setor }}</p>
<p><strong>E-mail:</strong> {{ chamado.email }}</p>
<p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
<p><strong>Problema:</strong> {{ chamado.problema }}</p>
<p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
<p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
<p><strong>Sala:</strong> {{ chamado.sala }}</p>
<p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
</div>
</div>


</template>
<script>
import axios from 'axios';
import { ROLES } from "../util/roles";

    export default {
        name: "ComponeteKaban",

        
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
    };  
  },
  confirmarRemocao(id) {
      Swal.fire({
        title: 'Tem certeza que deseja deletar?',
        text: "Esta ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletarChamado(id);
        }
      });
    },
    deletarChamado(id) {
      // Lógica para remover o chamado do array `chamadosAnalise`
      this.chamadosAnalise = this.chamadosAnalise.filter(chamado => chamado.id !== id);
      Swal.fire('Deletado!', 'O chamado foi removido.', 'success');
    },
    async atualizarFiltro(event) {
    await this.carregarChamados();
      
    },
  mounted() {
    this.carregarChamados();
    this.atualizarChamados();
    this.role = localStorage.getItem("role")
  },
  
  methods: {

},

 async carregarChamados() {
    
    try {
      const token = localStorage.getItem("token");

      const resposta = await axios.get('http://localhost:3000/chamados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      this.chamados = resposta.data;

   this.chamados = this.filterOcupacao !== "TODOS" ? this.chamados.filter(
    (chamado) => chamado.ocupacao === this.filterOcupacao
) : this.chamados;
      
      this.chamadosAnalise = this.chamados.filter(
        (chamado) => chamado.status === "Análise"

      );
      this.chamadosAndamento = this.chamados.filter(
        (chamado) => chamado.status === "Em Andamento"
      );
      this.chamadosConcluidos = this.chamados.filter(
        (chamado) => chamado.status === "Concluido"
      );
      this.chamadosPendentes = this.chamados.filter(
        (chamado) => chamado.status === "Pendentes"
      );
    } catch (erro) {
      console.error("Erro ao carregar os chamados:", erro);
    }
  },

  atualizarChamados() {
    setInterval(() => {
      this.carregarChamados();
    }, 1000 * 60);
  },



allowDrop(event) {
    event.preventDefault();
  },
  drag(event, chamado) {
    event.dataTransfer.setData("chamado", JSON.stringify(chamado));
  },

  async drop(event) {
    const Analise = document.getElementById("Análise")
    const pendentes = document.getElementById("Pendentes")
    const concluidos = document.getElementById("Concluido")
    const andamento = document.getElementById("Em Andamento")
    let status = ''

    if (pendentes === event.target || pendentes.contains(event.target)) {
      status = 'Pendentes'
    } else if (Analise === event.target || Analise.contains(event.target)) {
      status = 'Análise'
    } else if (concluidos === event.target || concluidos.contains(event.target)) {
      status = 'Concluido'
    } else if (andamento === event.target || andamento.contains(event.target)) {
      status = 'Em Andamento'

    }



    event.preventDefault();
    const chamado = JSON.parse(event.dataTransfer.getData("chamado"));
    const result = await Swal.fire({
      title: "Voce tem certeza?",
      text: "voce deseja mudar o status do chamado?",
      showCancelButton: true,
      icon: "question",
    });

    if (!result.isConfirmed) {
      return;
    }

    chamado.status = status;
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:3000/chamados/${chamado.id}`, chamado, {
      headers: {
        Authorization: `Bearer ${token}`, // Correção aqui
      },
    });
    await this.carregarChamados();
  },


  allowDrop(event) {
    event.preventDefault();
  },
}

    
</script>

<style>
header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

/* Sidebar */
.sidebar {
  background-color: #0d6efd;
  width: 400px;
  min-height: 100vh;
  color: white;
  padding: 1rem;
  transition: transform 0.3s ease-in-out;
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

  .hamburger {
    display: block;
  }
}
</style>