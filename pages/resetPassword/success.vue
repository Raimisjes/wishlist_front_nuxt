<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

function toHomepage(): void {
  router.push('/');
}
</script>

<template>
  <main>
    <div>
      <v-icon color="primary">mdi-check-circle</v-icon>
      <h2>{{ $t('pages.resetPasswordSuccess.title') }}</h2>
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
      margin: 15px 0 30px 0;
    }
  }
}
</style>
