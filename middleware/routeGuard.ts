import { abortNavigation } from 'nuxt/app';
import { useUserStore } from '~/stores/user';

// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  //unavailable routes for logged users
  if (
    (to.path === '/login' || to.path === '/registration') &&
    useUserStore().state.authenticated
  ) {
    return abortNavigation();
  }

  if (to.path === '/registration/success' && from.path !== '/registration') {
    return abortNavigation();
  }

  if (to.path === '/settings' && !useUserStore().state.authenticated) {
    return abortNavigation();
  }
});
