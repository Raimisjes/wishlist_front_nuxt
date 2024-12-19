import { abortNavigation } from 'nuxt/app';
import { useUserStore } from '~/stores/user';

// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  //unavailable routes for authenticated users
  if (
    (to.fullPath.includes('/login') ||
      to.fullPath.includes('/registration') ||
      to.fullPath.includes('/resetpassword')) &&
    useUserStore().state.authenticated
  ) {
    return abortNavigation();
  }

  //registration success page routeguard
  if (
    to.fullPath.includes('/registration/success') &&
    from.path !== '/registration'
  ) {
    return abortNavigation();
  }

  //resetpassword success page routeguard
  if (
    (to.fullPath.includes('/resetpassword/success') ||
      to.fullPath.includes('/resetpassword/changesuccess')) &&
    !from.fullPath.includes('/resetpassword')
  ) {
    return abortNavigation();
  }

  if (
    to.fullPath.includes('/settings') &&
    !useUserStore().state.authenticated
  ) {
    return abortNavigation();
  }
});
