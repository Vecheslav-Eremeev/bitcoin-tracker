<template>
  <div class="container">
    <TheAlert :alert="alert" @close="alert = null" />

    <TheLoader v-if="loading" />

    <div v-else>
      <div v-if="charts.length < 1" class="card">
        <h1>Нет сохраненых данных</h1>
        <nuxt-link to="/parse">Отследить курс</nuxt-link>
      </div>
      <div v-else>
        <div v-for="chart in charts" :key="chart.id" class="card">
          <h3>{{ chart.title }}</h3>
          <button class="btn danger" @click="removeChart(chart.id)">
            Удалить
          </button>
          <LineChart
            :chartData="chart.chartData"
            :options="options"
            class="line-chart"
            :key="chart.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultChartData, options } from "../../static/options";

export default {
  data() {
    return {
      url_database:
        "https://bitcoin-tracker-54761-default-rtdb.europe-west1.firebasedatabase.app/" +
        "charts",
      charts: [],
      loading: true,
      options,
      alert: null
    };
  },

  methods: {
    async removeChart(id) {
      try {
        await this.$axios.delete(this.url_database + `/${id}.json`);
        this.charts = this.charts.filter((i) => i.id !== id);
        this.alert = {
          type: "primary",
          title: "Успешно удаленно",
        };
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  async fetch() {
    this.loading = true;
    try {
      const { data } = await this.$axios.get(this.url_database + ".json");
      const tempCharts = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        };
      });
      tempCharts.forEach((c) => {
        const currentChartData = {
          labels: c.labels,
          datasets: [
            {
              label: "USD",
              data: c.values,
              ...defaultChartData,
            },
          ],
        };

        this.charts.unshift({
          id: c.id,
          title: `Курс с ${c.data.startDate} по ${c.data.endDate} с периодом
        в ${c.data.range}`,
          chartData: currentChartData,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
    this.loading = false;
  },
};
</script>
