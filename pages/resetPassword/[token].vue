<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useChangePasswordStore } from '@/stores/changePassword';
import { storeToRefs } from 'pinia';
import { ref, onUnmounted, onMounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const changePassStore = useChangePasswordStore();

const { state: changePassState } = storeToRefs(changePassStore);

const viewChangePassForm = ref(false);
const pageLoading = ref(true);

const changePassFormEl = useTemplateRef('changePasswordForm');

const validationRules = {
  passwordRules: [
    (v: string) => !!v || t('errors.validation033'),
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).\S{6,15}$/.test(v) ||
      t('errors.validation008'),
  ],
  passwordRepeatRules: [
    (v: string) =>
      v === useChangePasswordStore().state.form.newPassword ||
      t('errors.validation034'),
  ],
};

onMounted(async () => {
  viewChangePassForm.value = await changePassStore.checkToken(
    route.params.token,
  );
  pageLoading.value = false;
  if (!viewChangePassForm.value) {
    router.push('/error');
  }
});

onUnmounted(() => {
  changePassStore.clearStore();
});

async function submitForm() {
  let validateStatus = await changePassFormEl.value?.validate();
  if (!validateStatus || !validateStatus.valid) return;
  changePassStore.changePassword();
}
</script>

<template>
  <main>
    <Transition name="fade">
      <div v-if="!pageLoading">
        <div class="form-holder" v-if="viewChangePassForm">
          <h1 v-html="$t('pages.changePassword.title')"></h1>
          <v-form @submit.prevent="submitForm()" ref="changePasswordForm">
            <div class="input-holder">
              <v-text-field
                v-model="changePassState.form.newPassword"
                :label="$t('pages.changePassword.newPassword')"
                :rules="validationRules.passwordRules"
                :append-icon="
                  changePassState.form.hideNewPassword
                    ? 'mdi-eye'
                    : 'mdi-eye-off'
                "
                hide-details="auto"
                validate-on="blur"
                variant="underlined"
                color="primary"
                theme="default"
                :type="
                  changePassState.form.hideNewPassword ? 'password' : 'text'
                "
                @click:append="
                  () =>
                    (changePassState.form.hideNewPassword =
                      !changePassState.form.hideNewPassword)
                "
              ></v-text-field>
            </div>
            <div class="input-holder">
              <v-text-field
                v-model="changePassState.form.repeatedNewPass"
                :label="$t('pages.changePassword.newRepeatedPassword')"
                :rules="[
                  ...validationRules.passwordRules,
                  ...validationRules.passwordRepeatRules,
                ]"
                :append-icon="
                  changePassState.form.hideRepeatedPassword
                    ? 'mdi-eye'
                    : 'mdi-eye-off'
                "
                hide-details="auto"
                validate-on="blur"
                variant="underlined"
                color="primary"
                theme="default"
                :type="
                  changePassState.form.hideRepeatedPassword
                    ? 'password'
                    : 'text'
                "
                @click:append="
                  () =>
                    (changePassState.form.hideRepeatedPassword =
                      !changePassState.form.hideRepeatedPassword)
                "
              ></v-text-field>
            </div>
            <div class="button-holder">
              <v-btn
                :disabled="changePassState.form.isLoading"
                :loading="changePassState.form.isLoading"
                color="primary"
                size="large"
                block
                :title="$t('pages.changePassword.buttonTitle')"
                type="submit"
                >{{ $t('pages.changePassword.buttonTitle') }}</v-btn
              >
            </div>
            <div class="form-error-holder" v-if="changePassState.form.error">
              {{ $t(changePassState.form.error) }}
            </div>
          </v-form>
        </div>
      </div>
    </Transition>
    <v-progress-circular
      v-if="pageLoading"
      :size="45"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </main>
</template>

<style lang="scss" scoped></style>
