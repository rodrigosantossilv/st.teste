<template>
  <div class="dashboard-container">
    <!-- Sidebar de navegação -->

    <!-- Conteúdo Principal com cartões resumo e gráficos -->
    <div class="content">
      <h2>Resumo Geral</h2>
      <div class="dashboard-summary">
        <div class="summary-card"><h3>Total de Chamados Abertos</h3><p>150</p></div>
        <div class="summary-card"><h3>Total de Chamados Finalizados</h3><p>120</p></div>
        <div class="summary-card"><h3>Total de Chamados Em Andamento</h3><p>30</p></div>
        <div class="summary-card"><h3>Tempo Médio de Resolução</h3><p>4h 30m</p></div>
        <div class="summary-card"><h3>Problemas Mais Recorrentes</h3><p>Impressoras, Rede</p></div>
      </div>

      <!-- Gráficos -->
      <h2>Estatísticas Visuais</h2>
      <div class="charts-container">
        <!-- Gráfico de Pizza -->
        <div class="chart-card">
          <h3>Distribuição de Chamados por Categoria</h3>
          <canvas id="pieChart"></canvas>
        </div>

        <!-- Gráfico de Barra -->
        <div class="chart-card">
          <h3>Chamados por Mês</h3>
          <canvas id="barChart"></canvas>
        </div>

        <!-- Gráfico de Linha -->
        <div class="chart-card">
          <h3>Evolução dos Chamados</h3>
          <canvas id="lineChart"></canvas>
        </div>

        <!-- Gráfico de Degrau -->
        <div class="chart-card">
          <h3>Chamados em Degrau</h3>
          <canvas id="stepChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'ComponenteHome',
  setup() {
    let pieChart, barChart, lineChart, stepChart;

    // Função reutilizável para criação de gráficos
    const createChart = (ctx, type, data, options) => {
      return new Chart(ctx, {
        type,
        data,
        options
      });
    };

    // Montagem do componente (onMounted)
    onMounted(() => {
      pieChart = createChart(document.getElementById('pieChart'), 'pie', {
        labels: ['TI', 'Manutenção', 'Outros'],
        datasets: [{
          data: [50, 30, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      });

      barChart = createChart(document.getElementById('barChart'), 'bar', {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
          label: 'Chamados por Mês',
          data: [20, 30, 40, 25, 35, 45],
          backgroundColor: '#4BC0C0'
        }]
      }, {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      });

      lineChart = createChart(document.getElementById('lineChart'), 'line', {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
          label: 'Evolução dos Chamados',
          data: [15, 25, 35, 45, 55, 65],
          borderColor: '#36A2EB',
          fill: false
        }]
      });

      stepChart = createChart(document.getElementById('stepChart'), 'line', {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [{
          label: 'Chamados em Degrau',
          data: [10, 15, 20, 30, 40, 50],
          borderColor: '#FF6384',
          stepped: true,
          fill: false
        }]
      });
    });

    // Desmontagem do componente (onUnmounted) para liberar recursos
    onUnmounted(() => {
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();
      if (lineChart) lineChart.destroy();
      if (stepChart) stepChart.destroy();
    });
  }
};
</script>





