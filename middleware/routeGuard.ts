import { abortNavigation } from 'nuxt/app';
import { useUserStore } from '~/stores/user';

// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  //unavailable routes for authenticated users
  if (
    (to.path === '/login' ||
      to.path === '/registration' ||
      to.path === '/resetpassword') &&
    useUserStore().state.authenticated
  ) {
    return abortNavigation();
  }
  //registration success page routeguard
  if (to.path === '/registration/success' && from.path !== '/registration') {
    return abortNavigation();
  }
  //resetpassword success page routeguard
  if (to.path === '/resetpassword/success' && from.path !== '/resetpassword') {
    return abortNavigation();
  }

  if (to.path === '/settings' && !useUserStore().state.authenticated) {
    return abortNavigation();
  }
});
