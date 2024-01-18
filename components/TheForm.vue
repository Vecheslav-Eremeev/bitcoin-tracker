<template>
  <div class="container">
    <form class="card" @submit.prevent="submitHandler">
      <div class="form-checkbox">
        <span class="label"
          >Исползовать по умолчанию период отображения данных или задать свой
          период</span
        >
        <div class="checkbox">
          <label
            ><input type="radio" v-model="opt" name="trip" value="yes" /> По
            умолчанию</label
          >
        </div>

        <div class="checkbox">
          <label
            ><input type="radio" v-model="opt" name="trip" value="no" /> Задать
            свой период</label
          >
        </div>
      </div>

      <div class="form-control" v-if="opt === 'no'">
        <label for="age">Задать период в днях</label>
        <input type="number" id="age" min="1" max="300" v-model.number="days" />
      </div>
      <!-- период отображения данных: день, неделя, месяц, год -->
      <div class="form-control" v-else>
        <label for="rangeDefault">Период отображения данных</label>
        <select id="rangeDefault" v-model="rangeDefault">
          <option value="1">День</option>
          <option value="7">Неделя</option>
          <option value="30">Месяц</option>
          <option value="365">Год</option>
        </select>
      </div>

      <div class="form-control">
        <label for="city">Валюта</label>
        <select id="city" v-model="сurrency">
          <option v-for="iso in iso_4217" :key="iso.id" :value="iso.id">
            {{ iso.code }} {{ iso.name }}
          </option>
        </select>
      </div>

      <div class="form-control">
        <label for="date">Дата старта вывода</label>
        <input
          id="date"
          type="date"
          v-model="startDate"
          min="2010-07-17"
          :max="maxDate"
        />
      </div>

      <button type="submit" class="btn primary">Показать</button>
      <button class="btn primary" @click="createChart">Сохранить</button>
    </form>
  </div>
</template>

<script>
import { iso_4217 } from "~/static/iso_4217";
export default {
  emits: ["action", 'create'],
  data() {
    return {
      maxDate: new Date(Date.now()).toISOString().slice(0, 10),
      startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      iso_4217,
      days: 3,
      сurrency: 840,
      rangeDefault: "1",
      opt: "yes",
    };
  },
  methods: {
    submitHandler() {
      const formData = {
        range: this.opt === "yes" ? this.rangeDefault : this.days,
        currency: this.сurrency,
        startDate: this.startDate,
      };

      this.$emit("action", formData);
    },
    async createChart() {
      this.$store.dispatch("coins/createChart", {
        startDate: this.startDate,
        endDate: this.maxDate,
        range: this.opt === "yes" ? this.rangeDefault : this.days
      });

      this.$emit("create");
    },
  },
};
</script>
