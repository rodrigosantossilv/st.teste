<template>
  <div class="login-container">
    <div class="left-side">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <img src="/images/ST.png" alt="Logotipo" />
      <img src="/images/circulos.png" alt="Circles" class="corner-img" />
    </div>

    <div class="right-side">
      <div class="login-box">
        <h2>Olá, Informe seu problema</h2>
        <b-form-group>
          <b-form-select
            v-model="problema"
            id="problema"
            @change="updateProblemas($event)"
          >
            <option value="" disabled>Selecione um problema</option>
            <option
              v-for="(problema, index) in problemas"
              :key="index"
              :value="problema.id"
            >
              {{ problema.descricao }}
            </option>
          </b-form-select>
        </b-form-group>
        
        <b-form-group
          v-if="problemas.some(p => (p.descricao === 'outros' || p.descricao === 'Computadores e Periféricos' || p.descricao === 'Softwares e Programas Específicos') && (p.id === problema))"
          label="Descreva o problema específico"
          label-for="descricaoProblema"
        >
          <b-form-input
            v-model="descricaoProblema"
            id="descricaoProblema"
            placeholder="Digite mais detalhes sobre o problema"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Bloco da sala*" label-for="blocodasala">
          <b-form-select
            v-model="blocodaSala"
            id="blocodasala"
            @change="updateSalas($event)"
          >
            <option value="" disabled>Selecione um Bloco da sala</option>
            <option
              v-for="(bloco, index) in blocos"
              :key="index"
              :value="bloco.id"
            >
              {{ bloco.nome_bloco }}
            </option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          v-if="blocodaSala"
          label="Selecionar sala*"
          label-for="sala"
        >
          <b-form-select v-model="numerodaSala" id="sala">
            <option value="" disabled>Selecione a Sala</option>
            <option v-for="sala in salas" :key="sala.id" :value="sala.id">
              {{ sala.numero_sala }}
            </option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary" @click="reportProblem">
          Relatar Problema
        </b-button>

        <div class="text-center mt-3">
          <router-link to="/" class="btn btn-link"
            >Voltar à página inicial</router-link
          >
        </div>
      </div>

      <div v-if="problemas.some(p => (p.descricao === 'Computadores e Periféricos' || p.descricao === 'Softwares e Programas Específicos') && (p.id === problema))">
        <h2>Selecione as Máquinas</h2>
        <b-button @click="showModal" variant="info">Selecionar Máquinas</b-button>
      </div>

      <!-- Modal para selecionar máquinas -->
      <b-modal v-model="isModalVisible" title="Selecione as Máquinas">
        <div class="rooms-grid">
          <div
            class="room-card"
            v-for="room in rooms"
            :key="room"
            @click="toggleRoomSelection(room)"
            :class="{ selected: selectedRooms.includes(room) }"
          >
            Maquina {{ room }}
          </div>
        </div>
        <b-button variant="primary" @click="saveSelectedRooms">Confirmar Seleção</b-button>
      </b-modal>

    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      rooms: Array.from({ length: 43 }, (_, i) => i + 1), // Gera um array de 1 a 43 para as máquinas
      selectedRooms: [], // Lista de salas selecionadas
      isModalVisible: false, // Controle da exibição do modal
      problema: "",
      problemas: [],
      blocodaSala: "",
      numerodaSala: "",
      salas: [],
      blocos: [],
      descricaoProblema: "",
    };
  },
  mounted() {
    this.fetchBlocos();
    this.exibirProblema();
  },
  methods: {
    fetchBlocos() {
      const apiEndpointBlocos = "http://localhost:3000/blocos/com/salas";
      const token = localStorage.getItem("token");
      axios
        .get(apiEndpointBlocos, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.blocos = response.data;
        })
        .catch((error) => {
          console.error("Erro ao carregar blocos:", error);
          Swal.fire("Erro", "Não foi possível carregar os blocos.", "error");
        });
    },
    toggleRoomSelection(room) {
      const index = this.selectedRooms.indexOf(room);
      if (index === -1) {
        this.selectedRooms.push(room);
      } else {
        this.selectedRooms.splice(index, 1);
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    saveSelectedRooms() {
      this.maquina = this.selectedRooms;
      this.isModalVisible = false;
    },
    updateSalas(value) {
      const blocodaSala = value;
      const bloco = this.blocos.find((bloco) => bloco.id === blocodaSala);
      this.salas = bloco.salas;
      this.numerodaSala = "";
    },
    updateProblemas(value) {
      const problema = value;
    },
    async exibirProblema() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3000/problemas", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.problemas = response.data;
      } catch (error) {
        console.error("Erro ao exibir problema:", error);
        Swal.fire("Erro", "Não foi possível exibir o problema.", "error");
      }
    },
    async cadastrarChamado() {
      const token = localStorage.getItem("token");
      const chamado = {
        problema_id: this.problema,
        bloco_id: this.blocodaSala,
        sala_id: this.numerodaSala,
        descricao: this.descricaoProblema,
        maquinas: this.selectedRooms,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/chamados",
          chamado,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Chamado cadastrado:", response.data);
        Swal.fire("Sucesso", "Chamado cadastrado com sucesso!", "success");
      } catch (error) {
        console.error("Erro ao cadastrar chamado:", error);
        Swal.fire("Erro", "Não foi possível cadastrar o chamado.", "error");
      }
    },
    reportProblem() {
      if (this.blocodaSala && this.numerodaSala && this.problema) {
        this.cadastrarChamado();
      } else {
        Swal.fire(
          "Erro",
          "Por favor, preencha todos os campos obrigatórios.",
          "error"
        );
      }
    },
  },
};
</script>



<style scoped>
/* Reset básico */
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

.lugar-selection {
  border: 1px solid #ccc;
  padding: 45px;
  margin-top: 20px;
  border-radius: 10px;
}

.sala {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.lugar {
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.lugar.selecionado {
  background-color: #007bff;
  color: white;
}

.btn-submit {
  margin-top: 10px;
}

/* Container de registro */
.login-container {
  display: flex;
 min-height: 100vh;
  position: relative;
  /* Necessário para a posição absoluta das bolhas */
}

/* Lado esquerdo - Imagem com gradiente e bolhas */
.left-side {
  flex: 1;
  background: linear-gradient(to bottom, #0575e6, #02298a, #021b79);
  display: flex;
  position: relative;

  justify-content: center;
  align-items: center;
  position: fixed;
  /* Permite que acompanhe a rolagem da página */
  height: 100%;
  /* Faz com que ocupe 100% da altura da tela */
  overflow: hidden;
  /* Garante que as bolhas fiquem dentro do lado esquerdo */
  z-index: 1;
  /* Mantém a camada do lado esquerdo acima do conteúdo da direita */
}

/* Lado direito - Formulário de registro */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* Adiciona flex-direction para empilhar elementos verticalmente */
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Caixa de registro */
.login-box {
  width: 85%;
  max-width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Estilo do título */
.login-box h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #0738b3;
}

/* Estilo dos inputs e textarea */
.login-box input,
.login-box textarea,
.login-box select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

/* Botão de envio */
.login-box button {
  width: 100%;
  padding: 11px;
  background-color: #02298a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Efeito de hover no botão */
.login-box button:hover {
  background-color: #2059ea;
}

/* Estilo do link */
.login-box .btn-link {
  color: rgb(8, 91, 143);
  text-decoration: none;
}

.login-box .btn-link:hover {
  text-decoration: underline;
}

/* Estilo da caixa de relatório selecionado */
.selected-report {
  width: 22%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-top: 20px;
}

/* Imagem no canto */
.corner-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 750px;
  height: auto;
}

/* Responsividade adicional */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-side {
    height: 30vh;
  }

  .right-side {
    height: auto;
  }

  .login-box {
    width: 90%;
  }
}

/* Bubbles Animation */
.bubbles {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: bubble 5s infinite;
}

.bubble:nth-child(1) {
  width: 60px;
  height: 60px;
  left: 10%;
  bottom: -100px;
  animation-duration: 7s;
}

.bubble:nth-child(2) {
  width: 100px;
  height: 100px;
  left: 30%;
  bottom: -150px;
  animation-duration: 9s;
}

.bubble:nth-child(3) {
  width: 80px;
  height: 80px;
  left: 50%;
  bottom: -200px;
  animation-duration: 6s;
}

.bubble:nth-child(4) {
  width: 120px;
  height: 120px;
  left: 70%;
  bottom: -250px;
  animation-duration: 8s;
}

.bubble:nth-child(5) {
  width: 90px;
  height: 90px;
  left: 80%;
  bottom: -300px;
  animation-duration: 10s;
}

@keyframes bubble {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  100% {
    transform: translateY(-1000px) scale(0);
    opacity: 0;
  }
}
table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 5px; /* Espaçamento entre as células */
}

td {
    text-align: center;
    border: 1px solid #ccc;
    height: 50px; /* Altura mínima para os lugares */
    background: #f0f0f0; /* Cor de fundo dos lugares */
}

.lugar {
    background: #f0f0f0; /* Cor de fundo para as células dos lugares */
}

.maquina {
    background: #e0e0e0; /* Cor de fundo para a célula "Máquina" */
    font-weight: bold; /* Texto em negrito */
}

.separacao {
    width: 10px; /* Largura da separação */
    background-color: transparent; /* Espaço vazio */
}
.room-selection {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  color: #333;
}

.rooms-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 colunas */
  gap: 4px;
  margin: 20px 0;
}

.room-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  border: 8px  solid  #0866ca;
  border-radius: 9px;
  background-color: #e9f7fe;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.room-card:hover {
  background-color: #cce4ff;
  transform: scale(1.05);
}

.room-card.selected {
  background-color: #007bff;
  color: white;
}

button {
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

.selected-rooms {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  background-color: #e9f7fe;
}

</style>