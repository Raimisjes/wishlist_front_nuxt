<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useChangePasswordStore } from '@/stores/changePassword';
import { storeToRefs } from 'pinia';
import { ref, onUnmounted, onMounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { createValidationRules } from '@/utils/validationRules';

// @ts-ignore
definePageMeta({
  middleware: 'route-guard',
});

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const validationRules = createValidationRules(t);

const changePassStore = useChangePasswordStore();

const { state: changePassState } = storeToRefs(changePassStore);

const viewChangePassForm = ref(false);
const pageLoading = ref(true);

const changePassFormEl = useTemplateRef('changePasswordForm');

const passwordRepeatRules = [
  (v: string) =>
    v === changePassState.value.form.newPassword || t('errors.validation034'),
];

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
              <UIElementsTextField
                :model-path="'newPassword'"
                :state="changePassState.form"
                :label="$t('pages.changePassword.newPassword')"
                :rules="validationRules.passwordRules"
                :field-type="'password'"
                :hint="$t('pages.registration.passwordHint')"
              />
            </div>
            <div class="input-holder">
              <UIElementsTextField
                :model-path="'repeatedNewPass'"
                :state="changePassState.form"
                :label="$t('pages.changePassword.newRepeatedPassword')"
                :rules="[
                  ...validationRules.passwordRules,
                  ...passwordRepeatRules,
                ]"
                :field-type="'password'"
              />
            </div>
            <div class="button-holder">
              <UIElementsButton
                :is-disabled="changePassState.form.isLoading"
                :is-loading="changePassState.form.isLoading"
                :is-block="true"
                :title="$t('pages.changePassword.buttonTitle')"
                :btn-size="'large'"
              />
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
