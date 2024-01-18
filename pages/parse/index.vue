<template>
  <div>
    <TheAlert :alert="alert" @close="alert = null" />

    <TheForm @action="searchData" @create="create" />
    <div class="card">
      <div>
        <LineChart
          :chartData="chartData"
          :options="options"
          class="line-chart"
          :key="lineKey"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { iso_4217 } from "~/static/iso_4217";
import { defaultChartData, options } from "../../static/options";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chartData: null,
      options: options,
      lineKey: 0,
      alert: null,
    };
  },
  methods: {
    searchData(params) {
      const date1 = new Date(Date.now());
      const date2 = new Date(params.startDate);
      const daysRange = Math.ceil(
        Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
      );
      this.$store.dispatch("coins/fetchCoins", {
        currency: params.currency,
        startDate: daysRange,
        range: params.range,
      });
      for (let i = 0; i < iso_4217.length; i++) {
        if (iso_4217[i].id == params.currency) {
          this.chartData.datasets[0].label = iso_4217[i].code;
        }
      }
    },
    create() {
      this.alert = {
        type: "primary",
        title: "Успешно сохраннено",
      };
    },
  },
  computed: {
    ...mapGetters({
      labels: "coins/getLabels",
      values: "coins/getValues",
    }),
  },
  watch: {
    labels(newValue) {
      this.chartData.labels = newValue;
      this.lineKey++;
    },
    values(newValue) {
      this.chartData.datasets[0].data = newValue;
    },
  },
  created() {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: "USD",
          data: this.values,
          ...defaultChartData,
        },
      ],
    };
  },
  async fetch({ store }) {
    await store.dispatch("coins/fetchCoins", {
      currency: "978",
      startDate: 365,
    });
  },
};
</script>
