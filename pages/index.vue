<template>
  <div>
    <div class="card">
      <h1>Привет вы на главной странице Bitcoin Tracker</h1>
      <p>
        Тут вы видите курс Bitcoin за прошедший год
      </p>

      <nuxt-link to="/parse">Отследить курс</nuxt-link>
    </div>

    <div class="card">
      <LineChart :chartData="chartData" :options="options" class="line-chart" />
    </div>
  </div>
</template>

<script>
import { defaultChartData, options } from "../static/options";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      chartData: null,
      options: options,
    };
  },
  computed: {
    ...mapGetters({
      labels: "coins/getLabels",
      values: "coins/getValues",
    }),
  },
  created() {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: 'USD',
          data: this.values,
          ...defaultChartData
        }
      ]
    }
  },
  async fetch({ store }) {
    await store.dispatch("coins/fetchCoins", {currency: '978', startDate: 365});
  },
};
</script>
