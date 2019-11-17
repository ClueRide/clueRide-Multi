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
    social: 'ZztcBTDcglTr10lyuLoq8Zy57EW4HXTZ',
    passwordless: 't6RcrSkjxxFfI0JCMsEifO8QJ72YBcDY'
  },
  domain: {
    social: 'clueride-social.auth0.com',
    passwordless: 'clueride.auth0.com'
  },
};
