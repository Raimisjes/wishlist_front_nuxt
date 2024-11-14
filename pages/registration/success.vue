<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function toHomepage(): void {
  router.push('/');
}
</script>

<template>
  <main>
    <div>
      <v-icon color="primary">mdi-check-circle</v-icon>
      <h2>{{ $t('pages.registrationSuccess.title') }}</h2>
      <v-btn color="primary" @click="toHomepage">{{
        $t('words.homepage')
      }}</v-btn>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  > div {
    text-align: center;

    .v-icon {
      font-size: 120px;
    }
    h2 {
      margin: 30px 0;
    }
  }
}
</style>
