export const createValidationRules = (t: (key: string) => string) => ({
  usernameRules: [(v: string) => !!v || t('errors.validation001')],
  passwordRules: [(v: string) => !!v || t('errors.validation007')],
});
