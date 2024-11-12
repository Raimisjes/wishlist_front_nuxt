<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack(): void {
  router.push('/');
}
</script>

<template>
  <div class="container">
    <PageHeader />
    <main>
      <div>
        <v-icon color="primary">mdi-emoticon-cry-outline</v-icon>
        <h2 class="text-4xl">{{ $t('pages.error.title') }}</h2>
        <v-btn color="primary" @click="goBack">{{ $t('words.back') }}</v-btn>
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 70px calc(100vh - 110px) 40px;
  min-height: 100vh;

  main {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;

    > div {
      text-align: center;

      .v-icon {
        font-size: 150px;
      }
      h2 {
        margin: 30px 0;
      }
    }
  }
}
</style>
