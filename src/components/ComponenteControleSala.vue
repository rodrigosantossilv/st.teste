<template>
    
<!-- Formulário para cadastro de sala -->
<div v-if="mostrarCadastrosala" class="table-container p-3">
        <form @submit.prevent="adicionarSala" class="mb-4">
          <h2>Cadastrar Salas</h2>
          <div class="form-group">
            <label for="bloco">Bloco da sala</label>
            <input type="text" id="bloco" v-model="novoBloco" placeholder="Digite o bloco" class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="nome">Nome da sala</label>
            <input type="text" id="nome" v-model="novoNome" placeholder="Digite o nome da sala" class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="numero">Número da sala</label>
            <input type="number" id="numero" v-model="novoNumero" placeholder="Digite o número da sala"
              class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Adicionar Sala</button>
          <h2>Pesquisa de salas cadastradas</h2>
          <input type="text" placeholder="Pesquisar por salas ou laboratórios cadastrados" class="form-control mb-3" />
        </form>


      </div>
      <div v-if="mostrarTabelasalas"  class="table-container p-3">
        <h2>Tabela de salas cadastradas</h2>
        <input type="text" placeholder="Pesquisa por salas ou laboratórios cadastrados" class="form-control mb-3" />
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
              <tr>
                <td data-label="Bloco">m</td>
                <td data-label="Número da sala">23</td>
                <td data-label="Nome da sala">Laboratório</td>
                <td data-label="Ações">
                  <button class="btn btn-warning btn-sm">Editar</button>
                  <button class="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
              <tr>
                <td data-label="Bloco">b</td>
                <td data-label="Número da sala">23</td>
                <td data-label="Nome da sala">Laboratório</td>
                <td data-label="Ações">
                  <button class="btn btn-warning btn-sm">Editar</button>
                  <button class="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
            
            </tbody>
          </table>
        </div>

</template>


<script>

export default {
    name: "ComponenteControleSala",

}


</script>