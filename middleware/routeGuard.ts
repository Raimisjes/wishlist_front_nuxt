import { abortNavigation } from 'nuxt/app';

// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path == '/registration' && to.path == '/registration/success') {
    console.log('routegood');
  } else {
    return abortNavigation();
  }
});
