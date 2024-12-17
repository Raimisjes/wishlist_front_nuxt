export default {
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      components: {
        header: {
          homepage: 'Homepage',
          logout: 'Log out',
          settings: 'Settings',
        },
        snackbar: {
          logout: 'You have been logged out.',
        },
      },
      pages: {
        index: {
          slogan: 'let your friends know what kind of a gift you wish for!',
          usernameCheckPrefix: 'gftme.one/',
          usernameCheckPlaceholder: 'nickname',
        },
        error: {
          title: 'Sorry, the page you are looking for, could not be found',
        },
        registration: {
          email: 'E-mail',
          username: 'Username',
          usernameHint: 'Available symbols: letters A-Z, numbers 0-9',
          password: 'Password',
          passwordHint:
            'Password should include at least one capital letter and at least on number.',
          conditionsLabel1:
            "By selecting I confirm that I've read and accept gftme.one",
          conditionsLabel2: 'Terms & Conditions',
        },
        registrationSuccess: {
          title: 'Registration was successful.',
        },
        settings: {
          title: 'Settings',
          changePassword: 'Change password',
          currentPassword: 'Current password',
          newPassword: 'New password',
          newRepeatedPassword: 'Repeat new password',
          socialNetworks: 'Social networks',
          changePassSuccess: 'The password has been changed successfully.',
          enablePublicView: 'Enable view on my page',
          editSocialNetworkSuccess: 'Social network link added successfully.',
        },
        login: {
          forgotPassword: 'Forgot password?',
        },
        resetPassword: {
          title: 'Reset password',
          explainText:
            'If you signed up with an email and password, reset your password below.',
          buttonTitle: 'Reset password',
        },
      },
      words: {
        login: 'Log in',
        signup: 'Sign up',
        back: 'Back',
        homepage: 'Homepage',
        change: 'Change',
        save: 'Save',
        link: 'link',
        email: 'E-mail',
      },
      errors: {
        undefined: 'Unexpected error. Try again later.',
        homepage: {
          usernameCheck: {
            minLength: 'Username too short',
            wrongFormat: 'Wrong username format',
          },
        },
        internal001: 'Unexpected error. Try again later.',
        internal002: 'Database error.',
        internal003: 'Limited access.',
        internal004: 'Unauthenticated.',
        internal005: 'Bad login credentials.',
        validation001: 'Username is mandatory',
        validation002: 'Username is taken',
        validation003: 'Wrong username format.',
        validation004: 'E-mail is mandatory',
        validation005: 'E-mail is already registered',
        validation006: 'Bad e-mail format',
        validation007: 'Password is required',
        validation008: 'Bad password format',
        validation009: 'You should accept with our terms and conditions',
        validation010: 'You should accept with our terms and conditions',
        validation011: 'Incorrect URL format.',
        // validation012: 'Per daug duomenų',
        // validation013: 'Pavadinimas privalomas',
        // validation014: 'Pavadinimas per ilgas',
        // validation015: 'Aprašymas per ilgas',
        // validation016: 'Statusas privalomas',
        // validation017: 'Neegzistuojantis statusas',
        // validation018: 'Nenurodytas noro savininkas',
        // validation019: 'Nenumatyta failo įkėlimo klaida. Bandykite iš naujo',
        // validation020: 'Failas per didelis',
        // validation021: 'Blogas failo formatas',
        // validation022: 'Per daug failų',
        // validation023: 'Noras nerastas',
        // validation024: 'Neteisingas noro savininkas',
        // validation025: 'Norų sąrašo pavadinimas privalomas',
        // validation026: 'Norų sąrašo pavadinimas per ilgas',
        // validation027: 'Norų sąrašo aprašymas per ilgas',
        // validation028: 'Norų sąrašo statusas privalomas',
        // validation029: 'Norų sąrašo statusas neegzistuoja',
        // validation030: 'Norų sąrašo savininkas privalomas',
        // validation031: 'Norų sąrašas nerastas',
        // validation032: 'Nenurodytas norų sąrašo savininkas',
        validation033: 'Field is required',
        validation034: 'New password should be equal in both fields.',
        validation035: 'Incorrect current password.',
      },
      socialNetworks: {
        facebook: 'Facebook',
        instagram: 'Instagram',
        youtube: 'Youtube',
        tiktok: 'Tik Tok',
      },
      phrases: {
        addSocialNetworkTitle: ({ named }) =>
          `Add your ${named('network')} link`,
        socialNetworkURLPlaceholder: ({ named }) =>
          `${named('network')} profile link`,
      },
      $vuetify: {
        input: {
          appendAction: 'Append Action',
        },
      },
    },
  },
  missing: (locale, key) => {
    console.warn(`Missing translation key: ${key} in locale: ${locale}`);
  },
};
