<template>
 
      <!-- Formulário para cadastrar novo aluno -->
      <div v-if="mostrarFormulario" class="form-container">
        <h2>Cadastrar usuário</h2>
        <form @submit.prevent="cadastrarAluno">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="novoAluno.nome" required />
          </div>
      
          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              v-model="novoAluno.telefone"
              @input="formatarTelefone"
              required
              maxlength="16"
            />
          </div>
      
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="novoAluno.gmail"
              required
            />
          </div>
      
          <div class="form-group">
            <label for="confirmar-email">Confirmar Email:</label>
            <input
              type="email"
              id="confirmar-email"
              v-model="novoAluno.confirmarEmail"
              required
            />
          </div>
      
          <div class="form-group">
            <label for="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              v-model="novoAluno.senha"
              required
              minlength="8"
              :title="'Senha deve ter pelo menos 8 caracteres'"
            />
            <small class="form-text text-muted">A senha deve ter pelo menos 8 caracteres.</small>
          </div>
      
          <div class="form-group">
            <label for="confirmar-senha">Confirmar Senha:</label>
            <input
              type="password"
              id="confirmar-senha"
              v-model="novoAluno.confirmarSenha"
              required
            />
          </div>
      
          <div class="form-group">
            <label>Tipo de Usuário:</label>
            <div class="radio-group">
              <input
                type="radio"
                id="estudante"
                value="ESTUDANTE"
                v-model="novoAluno.tipoUsuario"
              />
              <label for="estudante">Estudante</label>
      
              <input
                type="radio"
                id="tecnico"
                value="TI"
                v-model="novoAluno.tipoUsuario"
              />
              <label for="tecnico">Técnico de TI</label>
      
              <input
                type="radio"
                id="docente"
                value="DOCENTE"
                v-model="novoAluno.tipoUsuario"
              />
              <label for="docente">Docente</label>
      
              <input
                type="radio"
                id="manutencao"
                value="MANUTENCAO"
                v-model="novoAluno.tipoUsuario"
              />
              <label for="manutencao">Técnico de Manutenção</label>
      
              <input
                type="radio"
                id="administrativo"
                value="NOA"
                v-model="novoAluno.tipoUsuario"
              />
              <label for="administrativo">NOA</label>
            </div>
          </div>
      
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
      </div>
         
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";
import { ROLES } from "../util/roles";
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: "QuartoComponenteCadastro",
  data() {
    return {
      mostrarFormulario: true,
      alunos: [],
      novoAluno: {
        senha: "",
        nome: "",
        email: "",
        telefone: "",
        gmail: "",
        confirmarEmail: "",
        confirmarSenha: "",
        tipoUsuario: "",
      },
    };
  },
  methods: {
  
      novoAluno: {
        senha: "",
        nome: "",
        email: "",
      
        tipoUsuario: "",
      },
      
    
    formatarTelefone(event) {
    // Remove todos os caracteres não numéricos
    let telefone = this.novoAluno.telefone.replace(/\D/g, '');

    // Aplica a máscara de acordo com a quantidade de dígitos
    if (telefone.length <= 10) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6, 10)}`;
    } else if (telefone.length <= 15) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)}`;
    } else if (telefone.length <= 20) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)} ${telefone.slice(15, 20)}`;
    } else {
        // Caso haja mais de 20 dígitos, truncamos o valor
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)} ${telefone.slice(15, 20)}`;
    }
},

submitForm() {
    // Remove caracteres não numéricos antes de validar
    const telefoneSemMascara = this.novoAluno.telefone.replace(/\D/g, '');
    
    if (telefoneSemMascara.length < 10 || telefoneSemMascara.length > 20) {
        alert('O telefone deve ter entre 10 e 20 dígitos.');
        return;
    }

    // Lógica de envio do formulário
},


  async cadastrarAluno() {
  // Verificar se as senhas e emails são iguais
  if (this.novoAluno.senha !== this.novoAluno.confirmarSenha) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

  if (this.novoAluno.gmail !== this.novoAluno.confirmarEmail) {
    alert("Os e-mails não coincidem. Por favor, verifique.");
    return;
  }

  // Verificar se a senha tem pelo menos 8 caracteres
  if (this.novoAluno.senha.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres.");
    return;
  }

  // Montar os dados do usuário
  const dadosUsuario = {
    nome_completo: this.novoAluno.nome,
    senha: this.novoAluno.senha,
    email: this.novoAluno.gmail,
    telefone: this.novoAluno.telefone,
    setor_id: this.novoAluno.setor_id, // Adicionar o setor_id no objeto de dados se necessário
    instituicao: "Senai",
    ocupacao: this.novoAluno.tipoUsuario,
  };

  const token = localStorage.getItem("token");

  try {
    // Enviar a requisição para o servidor
    const resposta = await axios.post(
      "http://localhost:3000/auth/register",
      dadosUsuario,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Resetar os campos do formulário
    this.novoAluno = {
      nome: "",
      email: "",
      tipoUsuario: "",
      senha: "",
      
    };
    this.mostrarFormulario = true;

    // Exibir a mensagem personalizada com base no tipo de usuário
    if (resposta.status === 201) {
      let mensagemSucesso = "";
      switch (this.novoAluno.tipoUsuario) {
        case "ESTUDANTE":
          mensagemSucesso = "Aluno cadastrado com sucesso!";
          break;
        case "TI":
          mensagemSucesso = "Técnico de TI cadastrado com sucesso!";
          break;
        case "DOCENTE":
          mensagemSucesso = "Docente cadastrado com sucesso!";
          break;
        case "MANUTENCAO":
          mensagemSucesso = "Técnico de Manutenção cadastrado com sucesso!";
          break;
        case "NOA":
          mensagemSucesso = "Usuário NOA cadastrado com sucesso!";
          break;
        default:
          mensagemSucesso = "Cadastro realizado com sucesso!";
      }
      alert(mensagemSucesso);
    } else {
      alert("Erro ao cadastrar o usuário");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar o usuário. Tente novamente.");
  }
},
  },
  
};

</script>

<style>


</style>