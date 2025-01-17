export const createValidationRules = (t: (key: string) => string) => ({
  usernameRules: [
    (v: string) => !!v || t('errors.validation001'),
    (v: string) => /^[a-zA-Z0-9]{3,20}$/.test(v) || t('errors.validation003'),
  ],
  passwordRules: [
    (v: string) => !!v || t('errors.validation007'),
    (v: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).\S{6,15}$/.test(v) ||
      t('errors.validation008'),
  ],
  usernameCheckRules: [
    (v: String) =>
      v.length >= 3 || t('errors.homepage.usernameCheck.minLength'),
    (v: String) =>
      v.match(/^[a-zA-Z0-9_.-]{3,20}$/) != null ||
      t('errors.homepage.usernameCheck.wrongFormat'),
  ],
  emailRules: [
    (v: string) => !!v || t('errors.validation004'),
    (v: string) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v,
      ) || t('errors.validation006'),
  ],
  termsAcceptedRules: [(v: string) => !!v || t('errors.validation009')],
  titleRules: [
    (v: string) => !!v || t('errors.validation013'),
    (v: string) => v.length <= 160 || t('errors.validation014'),
  ],
  descriptionRules: [
    (v: string) => v.length <= 500 || t('errors.validation015'),
  ],
  urlRules: [
    (v: string) =>
      /^(?:(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*)?$/i.test(
        v,
      ) || t('errors.validation011'),
  ],
});
