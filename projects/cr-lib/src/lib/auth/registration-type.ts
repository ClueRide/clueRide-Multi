interface RegistrationType {
  SOCIAL: string;
  PASSWORDLESS: string;
}

export const REGISTRATION_TYPE: RegistrationType = {
  SOCIAL: 'SOCIAL',               // Google or Facebook as an example
  PASSWORDLESS: 'PASSWORDLESS',   // Use a code to verify an email address
};
