<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onUnmounted } from 'vue';
import { useResetPasswordStore } from '@/stores/resetPassword';
import { storeToRefs } from 'pinia';

const { t } = useI18n();

const resetPassStore = useResetPasswordStore();

const { state: resetPassState } = storeToRefs(resetPassStore);

const resetPassFormEl = useTemplateRef('resetPasswordForm');

const validationRules = {
  emailRules: [
    (v: string) => !!v || t('errors.validation004'),
    (v: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v,
      ) || t('errors.validation006'),
  ],
};

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
          <v-text-field
            v-model="resetPassState.form.email"
            :label="$t('words.email')"
            :rules="validationRules.emailRules"
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
          ></v-text-field>
        </div>
        <div class="button-holder">
          <v-btn
            :disabled="resetPassState.form.isLoading"
            :loading="resetPassState.form.isLoading"
            color="primary"
            size="large"
            block
            :title="$t('pages.resetPassword.buttonTitle')"
            type="submit"
            >{{ $t('pages.resetPassword.buttonTitle') }}</v-btn
          >
        </div>
        <div class="form-error-holder" v-if="resetPassState.form.error">
          {{ $t(resetPassState.form.error) }}
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
