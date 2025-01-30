<script setup lang="ts">
import { useSeoMeta, useRuntimeConfig } from 'nuxt/app';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const config = useRuntimeConfig();

useSeoMeta({
  title: `${config.public.PROJECT_NAME}`,
  ogTitle: `${config.public.PROJECT_NAME}`,
  description: t('meta.description'),
  ogDescription: t('meta.description'),
});
</script>

<template>
  <NuxtLayout />
</template>
