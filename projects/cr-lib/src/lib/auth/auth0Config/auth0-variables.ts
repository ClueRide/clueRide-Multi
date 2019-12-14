interface AuthConfig {
  clientID: {
    social: string,
    passwordless: string
  };
  domain: {
    social: string,
    passwordless: string
  };
}

export const AUTH_CONFIG: AuthConfig = {
  /* This is publicly shareable. */
  clientID: {
    social: 'LbrBEjWpXwzZ3x4EiMHV22dnenwVsXn4',
    passwordless: '5Bvzw8AYEA4Hl3VARQ55t3wwINapre5Z'
  },
  domain: {
    social: 'clueride-shared.auth0.com',
    passwordless: 'clueride-shared.auth0.com'
  },
};
