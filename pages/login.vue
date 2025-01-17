<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { createValidationRules } from '@/utils/validationRules';

const { t } = useI18n();

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const authStore = useAuthStore();

const { state: authState } = storeToRefs(authStore);

const loginFormEl = useTemplateRef('loginForm');

const validationRules = createValidationRules(t);

async function submitForm() {
  let validateStatus = await loginFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  await authStore.login();
}

onUnmounted(() => {
  authStore.clearForm();
});
</script>

<template>
  <main>
    <div class="form-holder">
      <h1 v-html="$t('words.login')"></h1>
      <v-form @submit.prevent="submitForm()" ref="loginForm">
        <div class="input-holder">
          <UIElementsTextField
            :state="authState.form"
            :model-path="'username'"
            :label="$t('pages.registration.username')"
            :rules="validationRules.usernameRules"
          />
        </div>
        <div class="input-holder">
          <UIElementsTextField
            :state="authState.form"
            :model-path="'password'"
            :label="$t('pages.registration.password')"
            :rules="validationRules.passwordRules"
            :append-inner-icon="
              authState.form.hidePassword ? 'mdi-eye' : 'mdi-eye-off'
            "
            :field-type="authState.form.hidePassword ? 'password' : 'text'"
            :on-click-append-inner="
              () => (authState.form.hidePassword = !authState.form.hidePassword)
            "
          />
        </div>
        <div class="button-holder">
          <UIElementsButton
            :is-disabled="authState.form.isLoading"
            :is-loading="authState.form.isLoading"
            :is-block="true"
            :title="$t('words.login')"
            :btn-size="'large'"
          />
        </div>
        <div class="form-error-holder" v-if="authState.form.error">
          {{ $t(authState.form.error) }}
        </div>
        <div class="password-reset">
          <NuxtLink
            to="/resetpassword"
            :aria-label="$t('pages.login.forgotPassword')"
            >{{ $t('pages.login.forgotPassword') }}</NuxtLink
          >
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.password-reset {
  text-align: center;
  margin: 15px 0 0 0;

  a {
    font-size: 13px;
    color: $text_color_light;

    &:hover {
      color: $primary;
    }
  }
}
</style>
