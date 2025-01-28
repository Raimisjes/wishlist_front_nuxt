import en from './locales/en.json';
import termsOfUseText from './locales/en_terms_of_use_text';

export default {
  legacy: false,
  locale: 'en',
  allowHtml: true,
  warnHtmlMessage: false,
  messages: {
    en: {
      ...en,
      termsOfUseText: termsOfUseText,
    },
  },
  missing: (locale, key) => {
    console.warn(`Missing translation key: ${key} in locale: ${locale}`);
  },
};
