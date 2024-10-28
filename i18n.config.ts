export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        components: {
          header: {
            homepage: "Homepage"
          }
        },
        words: {
            login: "Login"
        }
      },
    }
  }))