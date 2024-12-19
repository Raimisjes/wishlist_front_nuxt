<script setup lang="ts">
import { useRouter } from 'vue-router';

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const router = useRouter();

function toLoginPage(): void {
  router.push('/login');
}
</script>

<template>
  <main>
    <div>
      <v-icon color="primary">mdi-check-circle</v-icon>
      <h2>{{ $t('pages.changePasswordSuccess.title') }}</h2>
      <v-btn color="primary" @click="toLoginPage">{{
        $t('words.login')
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
