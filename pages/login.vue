<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onUnmounted } from 'vue';
import { useLoginStore } from '@/stores/login';

const { t } = useI18n();

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const loginStore = useLoginStore();

const loginFormEl = useTemplateRef('loginForm');

const validationRules = {
  usernameRules: [(v: string) => !!v || t('errors.validation001')],
  passwordRules: [(v: string) => !!v || t('errors.validation007')],
};

async function submitForm() {
  let validateStatus = await loginFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  loginStore.login();
}

onUnmounted(() => {
  useLoginStore().clearStore();
});
</script>

<template>
  <main>
    <div class="form-holder">
      <h1 v-html="$t('words.login')"></h1>
      <v-form @submit.prevent="submitForm()" ref="loginForm">
        <div class="input-holder">
          <v-text-field
            v-model="loginStore.state.form.username"
            :label="$t('pages.registration.username')"
            :rules="validationRules.usernameRules"
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-text-field
            v-model="loginStore.state.form.password"
            :label="$t('pages.registration.password')"
            :rules="validationRules.passwordRules"
            :append-icon="
              loginStore.state.form.hidePassword ? 'mdi-eye' : 'mdi-eye-off'
            "
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
            :type="loginStore.state.form.hidePassword ? 'password' : 'text'"
            @click:append="
              () =>
                (loginStore.state.form.hidePassword =
                  !loginStore.state.form.hidePassword)
            "
          ></v-text-field>
        </div>
        <div class="button-holder">
          <v-btn
            :disabled="loginStore.state.form.isLoading"
            :loading="loginStore.state.form.isLoading"
            color="primary"
            size="large"
            block
            :title="$t('words.login')"
            type="submit"
            >{{ $t('words.login') }}</v-btn
          >
        </div>
        <div class="form-error-holder" v-if="loginStore.state.form.error">
          {{ $t(loginStore.state.form.error) }}
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
