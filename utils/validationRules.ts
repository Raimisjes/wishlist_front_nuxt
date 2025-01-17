export const createValidationRules = (t: (key: string) => string) => ({
  usernameRules: [(v: string) => !!v || t('errors.validation001')],
  passwordRules: [(v: string) => !!v || t('errors.validation007')],
  usernameCheckRules: [
    (v: String) =>
      v.length >= 3 || t('errors.homepage.usernameCheck.minLength'),
    (v: String) =>
      v.match(/^[a-zA-Z0-9_.-]{3,20}$/) != null ||
      t('errors.homepage.usernameCheck.wrongFormat'),
  ],
});
