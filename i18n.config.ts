import en from './locales/en.json';
import privacyPolicy from './locales/en_privacy_policy_text';
import termsOfUseText from './locales/en_terms_of_use_text';

export default {
  legacy: false,
  locale: 'en',
  allowHtml: true,
  warnHtmlMessage: false,
  messages: {
    en: {
      ...en,
      termsOfUseText,
      privacyPolicy,
    },
  },
  missing: (locale, key) => {
    console.warn(`Missing translation key: ${key} in locale: ${locale}`);
  },
};
