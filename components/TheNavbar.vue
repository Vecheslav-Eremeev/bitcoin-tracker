<template>
  <header class="navbar">
    <h3>Bitcoin Tracker</h3>
    <ul class="navbar-menu">
      <li>
        <nuxt-link to="/">Главная</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/parse">Отследить курс</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/saved">Сохранения</nuxt-link>
      </li>
      <li><a href="#" @click.prevent="logout">Выйти</a></li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/setAuth", false);
      this.$router.push("/");
    },
  },
};
</script>
