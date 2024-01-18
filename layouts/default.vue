<template>
  <div>
    <div v-if="isAuth">
      <TheNavbar />
      <div class="container with-nav">
        <Nuxt />
      </div>
    </div>
    <div class="container" v-else>
        <TheLogin />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isAuth: "auth/getAuth",
    }),
  },
};
</script>
