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
          wishlists: 'Wishlists',
        },
        snackbar: {
          logout: 'You have been logged out.',
        },
        fileUpload: {
          uploadText: 'Drop image here or click to upload',
        },
      },
      pages: {
        index: {
          slogan: 'Let your friends know exactly what would make you smile!',
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
            'Password should include at least one capital letter and at least one number.',
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
          editSocialNetworkSuccess:
            'Social network link info has been changed successfully.',
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
        resetPasswordSuccess: {
          title: 'You’ve received an email with password reset instructions.',
        },
        changePassword: {
          title: 'Create new password',
          newPassword: 'New password',
          newRepeatedPassword: 'Repeat new password',
          buttonTitle: 'Create new password',
        },
        changePasswordSuccess: {
          title: 'The password has been changed successfully.',
        },
        wishlists: {
          title: 'Wishlists',
          addNewWishlist: 'Create wishlist',
          editWishlist: 'Edit wishlist',
          wishlistTitle: 'Wishlist title',
          wishlistDescription: 'Wishlist description',
          addWishlistSuccess: 'Wishlist has been created successully.',
          editWishlistSuccess: 'Wishlist has been saved successully.',
          removeWishlistSuccess: 'Wishlist has been successully removed.',
        },
        myWishlist: {
          title: 'Wishlist',
          addNewWish: 'Add wish',
          enterURL: 'Insert URL from the web',
          giftTitle: 'Gift title',
          giftDescription: 'Gift description',
          addWishSuccess: 'Wish has been created successully.',
          removeListingSuccess: 'Wish has been successully removed.',
        },
      },
      words: {
        login: 'Log in',
        signup: 'Sign up',
        back: 'Back',
        homepage: 'Homepage',
        change: 'Change',
        save: 'Save',
        edit: 'Edit',
        link: 'link',
        email: 'E-mail',
        check: 'Check',
        checkURL: 'Check link',
        image: 'Image',
        close: 'Close',
        remove: 'Remove',
        public: 'Public',
        private: 'Private',
        submit: 'Submit',
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
        internal006: 'Unauthenticated.',
        internal007: 'Unexpected error. Try again later.',
        internal008:
          "You don't have the necessary permissions to perform this action.",
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
        validation012: 'Unexpected error. Try different link.',
        validation013: 'Title is required',
        validation014: 'Title is too long',
        validation015: 'Description is too long',
        validation016: 'Status is required',
        validation017: "Status doesn't exist",
        validation018: 'Wish owner is required',
        validation019: 'File upload error. Try again later.',
        validation020: 'File too large',
        validation021: 'Incorrect file format',
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
        validation036: `The provided email address does not match any existing user account.`,
        validation037:
          'Too much password reset attempts. Please, try again later.',
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
        removeWishlist: ({ named }) =>
          `Are you sure you want to remove <span>${named('wishlist')}</span> wishlist?`,
        removeListing: ({ named }) =>
          `Are you sure you want to remove <span>${named('listing')}</span> wish?`,
      },
      $vuetify: {
        input: {
          appendAction: 'Append Action',
        },
        carousel: {
          ariaLabel: {
            delimiter: '',
          },
        },
      },
    },
  },
  missing: (locale, key) => {
    console.warn(`Missing translation key: ${key} in locale: ${locale}`);
  },
};
