/**
 * Provides the Key values for the Registration States.
 */
export enum RegStateKey {
  INITIAL,  // Waiting to be triggered
  ACTIVE,   // Active Access Token is available for use
  REGISTRATION_REQUIRED,  // Need to get the user involved in the registration of this device
  CONFIRMATION_REQUIRED,  // Need to ask the user to confirm profile information we have on hand
}
