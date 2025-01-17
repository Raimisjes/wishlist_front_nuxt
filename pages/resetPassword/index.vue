<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onUnmounted } from 'vue';
import { useResetPasswordStore } from '@/stores/resetPassword';
import { storeToRefs } from 'pinia';
import { createValidationRules } from '@/utils/validationRules';

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();

const validationRules = createValidationRules(t);

const resetPassStore = useResetPasswordStore();
const { state: resetPassState } = storeToRefs(resetPassStore);

const resetPassFormEl = useTemplateRef('resetPasswordForm');

async function submitForm() {
  let validateStatus = await resetPassFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  resetPassStore.resetPasswordInit();
}

onUnmounted(() => {
  resetPassStore.clearStore();
});
</script>

<template>
  <main>
    <div class="form-holder">
      <h1 v-html="$t('pages.resetPassword.title')"></h1>
      <p v-html="$t('pages.resetPassword.explainText')"></p>
      <v-form @submit.prevent="submitForm()" ref="resetPasswordForm">
        <div class="input-holder">
          <UIElementsTextField
            :model-path="'email'"
            :state="resetPassState.form"
            :label="$t('words.email')"
            :rules="validationRules.emailRules"
          />
        </div>
        <div class="button-holder">
          <UIElementsButton
            :is-disabled="resetPassState.form.isLoading"
            :is-loading="resetPassState.form.isLoading"
            :is-block="true"
            :title="$t('pages.resetPassword.buttonTitle')"
            :btn-size="'large'"
          />
        </div>
        <div class="form-error-holder" v-if="resetPassState.form.error">
          {{ $t(resetPassState.form.error) }}
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
