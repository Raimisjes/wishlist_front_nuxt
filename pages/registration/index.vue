<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef } from 'vue';
import { useRegistrationStore } from '@/stores/registration';

const { t } = useI18n();

const store = useRegistrationStore();
const state = useRegistrationStore().state.registration;

const registrationFormEl = useTemplateRef('registrationForm');

const validationRules = {
  usernameRules: [
    (v: string) => !!v || t('errors.validation001'),
    (v: string) => /^[a-zA-Z0-9]{3,20}$/.test(v) || t('errors.validation003'),
  ],
  emailRules: [
    (v: string) => !!v || t('errors.validation004'),
    (v: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v,
      ) || t('errors.validation006'),
  ],
  passwordRules: [
    (v: string) => !!v || t('errors.validation007'),
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).\S{6,15}$/.test(v) ||
      t('errors.validation008'),
  ],
  termsAcceptedRules: [(v: string) => !!v || t('errors.validation009')],
};

async function submitForm() {
  let validateStatus = await registrationFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  store.register();
}
</script>

<template>
  <main>
    <div class="form-holder">
      <h1 v-html="$t('words.signup')"></h1>
      <v-form @submit.prevent="submitForm()" ref="registrationForm">
        <div class="input-holder">
          <v-text-field
            v-model="state.form.email"
            :label="$t('pages.registration.email')"
            :rules="validationRules.emailRules"
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-text-field
            v-model="state.form.username"
            :label="$t('pages.registration.username')"
            :rules="validationRules.usernameRules"
            :hint="$t('pages.registration.usernameHint')"
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-text-field
            v-model="state.form.password"
            :label="$t('pages.registration.password')"
            :rules="validationRules.passwordRules"
            :append-icon="state.form.hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
            :hint="$t('pages.registration.passwordHint')"
            hide-details="auto"
            validate-on="blur"
            variant="underlined"
            color="primary"
            theme="default"
            :type="state.form.hidePassword ? 'password' : 'text'"
            @click:append="
              () => (state.form.hidePassword = !state.form.hidePassword)
            "
          ></v-text-field>
        </div>
        <div class="input-holder">
          <v-checkbox
            v-model="state.form.termsAccepted"
            color="primary"
            required
            :rules="validationRules.termsAcceptedRules"
          >
            <template v-slot:label>
              <div class="tnc-text">
                {{ $t('pages.registration.conditionsLabel1') }}
                <a to="/">{{ $t('pages.registration.conditionsLabel2') }}</a>
              </div>
            </template>
          </v-checkbox>
        </div>
        <div class="button-holder">
          <v-btn
            :disabled="state.form.isLoading"
            :loading="state.form.isLoading"
            color="primary"
            size="large"
            block
            :title="$t('words.signup')"
            type="submit"
            >{{ $t('words.signup') }}</v-btn
          >
        </div>
        <div class="form-error-holder" v-if="state.form.error">
          {{ $t(state.form.error) }}
        </div>
      </v-form>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.tnc-text {
  a {
    color: #00b565;
  }
}
</style>
