<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useTemplateRef, onMounted, onUnmounted } from 'vue';
import { useHomepageStore } from '@/stores/homepage';
import { useRegistrationStore } from '@/stores/registration';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { createValidationRules } from '~/composables/validationRules';
import { navigateTo } from 'nuxt/app';
import { register } from 'swiper/element/bundle';
import 'swiper/scss/navigation';
import 'swiper/css';

register();

const router = useRouter();
const { t } = useI18n();

const validationRules = createValidationRules(t);

const homepageStore = useHomepageStore();
const registrationStore = useRegistrationStore();
const userStore = useUserStore();

const { state: homepageState } = storeToRefs(homepageStore);

const usernameCheckFormEl = useTemplateRef('usernameCheckFormEl');

const swiperOptions = {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    750: {
      slidesPerView: 1,
    },
  },
};

function submitForm() {
  if (!usernameCheckFormEl.value?.isValid) return;
  homepageStore.checkUsername();
}

function onInputUsername() {
  homepageStore.state.usernameCheck.usernameExists = null;
  homepageStore.state.usernameCheck.form.error = '';
}

function goRegister() {
  registrationStore.state.form.username =
    homepageStore.state.usernameCheck.form.username;
  router.push('/registration');
}

onMounted(async () => {
  await homepageStore.getNewListings();
});

onUnmounted(() => {
  homepageStore.clearStore();
});
</script>

<template>
  <main class="homepage">
    <div class="hero-title">
      <h1 v-html="$t('pages.index.slogan')"></h1>
      <Transition name="fade">
        <v-form
          @submit.prevent="submitForm()"
          ref="usernameCheckFormEl"
          v-if="!userStore.state.authenticated"
        >
          <UIElementsTextField
            :state="homepageState.usernameCheck.form"
            :model-path="'username'"
            :label="''"
            :placeholder="$t('pages.index.usernameCheckPlaceholder')"
            :rules="validationRules.usernameCheckRules"
            :append-inner-icon="'mdi-magnify'"
            :on-click-append-inner="() => submitForm()"
            :prefix="`${$t('pages.index.usernameCheckPrefix')}@`"
            :error-messages="
              homepageState.usernameCheck.form.error != ''
                ? $t(homepageState.usernameCheck.form.error)
                : ''
            "
            :is-loading="homepageState.usernameCheck.form.isLoading"
            :is-disabled="homepageState.usernameCheck.form.isLoading"
            :on-input="() => onInputUsername()"
            :validate-on="'lazy'"
          />
          <Transition name="fade">
            <div
              class="button-holder"
              v-if="homepageState.usernameCheck.usernameExists == false"
              mode="in-out"
            >
              <UIElementsButton
                :btn-type="'button'"
                :title="$t('words.signup')"
                :btn-size="'small'"
                :on-click="() => goRegister()"
              />
            </div>
          </Transition>
        </v-form>
      </Transition>
    </div>
    <div class="new-wishes-block content-holder user-page">
      <CommonSpinner v-if="homepageStore.state.page?.isLoading" />
      <div class="new-wishes-holder" v-else>
        <h3 id="title">{{ $t('pages.index.newListingsTitle') }}</h3>
        <div
          class="wishes-carousel"
          v-if="homepageStore.state.newListings.length > 0"
        >
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
          <swiper-container v-bind="swiperOptions">
            <swiper-slide
              v-for="listing in homepageStore.state.newListings"
              :key="listing.title"
            >
              <div class="wish-item">
                <img
                  src="@/assets/images/gift-placeholder.png"
                  v-if="!listing?.photo"
                />
                <img v-else :src="listing?.photo" />
                <div class="info">
                  <h5
                    @click="
                      navigateTo(listing.url, {
                        external: true,
                        open: {
                          target: '_blank',
                        },
                      })
                    "
                  >
                    {{ listing?.title }}
                  </h5>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  &.homepage {
    @media screen and (max-width: 750px) {
      flex-flow: column wrap;

      .new-wishes-block {
        max-width: 100%;
      }
    }
  }
  .hero-title {
    padding: 0 30px 0 0;

    h1 {
      font-size: 70px;
      font-weight: 700;
      margin: 15px 0;
      color: var(--text-color);
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: flex-start;
      height: 120px;

      .v-input {
        width: 100%;
        max-width: calc(100% - 135px);
        max-height: 77px;
      }
      .button-holder {
        padding: 5px 0 0 15px;

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

  .new-wishes-block {
    display: flex;
    min-height: 200px;
    max-width: 350px;
    padding: 20px 40px;
    margin: 10px 0 20px 0;

    .spinner-holder {
      min-height: auto;
    }
    .new-wishes-holder {
      display: block;
      width: 100%;

      > h3 {
        text-align: center;
        margin: 0 0 15px 0;
      }
      .wishes-carousel {
        max-width: 100%;
        position: relative;

        swiper-slide {
          padding: 5px 0;
          margin: auto;

          .wish-item {
            max-width: 230px;
            margin: 0 auto;
          }
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: $primary;

          &:after {
            font-size: 30px;
          }
        }
        .swiper-button-prev {
          left: -18px;
        }
        .swiper-button-next {
          right: -18px;
        }
      }
      @media screen and (max-width: 600px) {
        margin: auto;
      }
    }
    @media screen and (max-width: 600px) {
      padding: 20px;
    }
  }

  @media screen and (max-width: 960px) {
    .hero-title {
      h1 {
        font-size: 50px;
      }
    }
  }

  @media screen and (max-width: 750px) {
    flex-flow: column-reverse nowrap;

    .hero-title {
      padding: 0;
      max-width: 350px;
      margin: 0 0 20px 0;

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
}
</style>
