<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef } from 'vue';
import { useHomepageStore } from '@/stores/homepage';
import { useRegistrationStore } from '@/stores/registration';
import { useRouter } from 'vue-router';

const router = useRouter();
const { locale, t } = useI18n();
const store = useHomepageStore();

const usernameCheckFormEl = useTemplateRef('usernameCheckFormEl');

const usernameCheck = {
  rules: {
    minLength: (v: String) =>
      v.length >= 3 || t('errors.homepage.usernameCheck.minLength'),
    match: (v: String) =>
      v.match(/^[a-zA-Z0-9_.-]{3,20}$/) != null ||
      t('errors.homepage.usernameCheck.wrongFormat'),
  },
};

function submitForm() {
  if (!usernameCheckFormEl.value?.isValid) return;
  store.checkUsername();
}

function onInputUsername() {
  store.state.usernameCheck.usernameExists = null;
  store.state.usernameCheck.form.error = '';
}
function goRegister() {
  useRegistrationStore().state.registration.form.username =
    store.state.usernameCheck.form.username;
  router.push('/registration');
}
</script>

<template>
  <main>
    <div class="left-side">
      <h1 v-html="$t('pages.index.slogan')"></h1>
      <v-form @submit.prevent="submitForm()" ref="usernameCheckFormEl">
        <v-text-field
          v-model="store.state.usernameCheck.form.username"
          @input="onInputUsername()"
          @click:append-inner="submitForm()"
          :loading="store.state.usernameCheck.form.isLoading"
          :disabled="store.state.usernameCheck.form.isLoading"
          :prefix="$t('pages.index.usernameCheckPrefix')"
          :error-messages="
            store.state.usernameCheck.form.error != ''
              ? $t(store.state.usernameCheck.form.error)
              : ''
          "
          :placeholder="$t('pages.index.usernameCheckPlaceholder')"
          :rules="[usernameCheck.rules.minLength, usernameCheck.rules.match]"
          variant="underlined"
          color="primary"
          theme="default"
          append-inner-icon="mdi-magnify"
        ></v-text-field>
        <Transition name="fade">
          <div
            class="button-holder"
            v-if="store.state.usernameCheck.usernameExists == false"
            mode="in-out"
          >
            <v-btn
              color="primary"
              @click="goRegister()"
              size="small"
              :title="$t('words.signup')"
              >{{ $t('words.signup') }}</v-btn
            >
          </div>
        </Transition>
      </v-form>
    </div>
    <!-- <div class="hero-image-holder"></div> -->
  </main>
</template>

<style lang="scss" scoped>
main {
  .left-side {
    padding: 0 30px 0 0;

    h1 {
      font-size: 70px;
      font-weight: 700;
      margin: 0 0 30px 0;
      color: var(--text-color);
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;
      height: 110px;

      .v-input {
        width: 100%;
        max-width: calc(100% - 135px);
        max-height: 77px;
      }
      .button-holder {
        padding: 20px 0 0 15px;

        .v-btn {
          width: 120px;

          .v-btn__content,
          .v-btn__prepend {
            color: #fff;
            font-weight: 600;
            text-transform: lowercase;
          }
        }
      }
    }
  }

  .hero-image-holder {
    min-width: 400px;
    height: 400px;
    background-image: url(@/assets/images/hero-image.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 960px) {
    .left-side {
      h1 {
        font-size: 50px;
      }
    }

    .hero-image-holder {
      min-width: 300px;
      height: 300px;
    }
  }

  @media screen and (max-width: 750px) {
    flex-flow: column-reverse nowrap;

    .left-side {
      padding: 0;
      max-width: 350px;

      h1 {
        font-size: 32px;
        text-align: center;
      }
      form {
        flex-flow: column nowrap;

        .v-input {
          max-width: 100%;
        }
        .button-holder {
          width: 100%;
          padding: 5px 0 0 0;

          .v-btn {
            width: 100%;
          }
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    .hero-image-holder {
      min-width: 250px;
      height: 250px;
    }
  }
}
</style>
