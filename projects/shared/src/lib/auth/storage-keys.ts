interface StorageKeySet {
  readonly profile: string;
  readonly jwtToken: string;
  readonly accessToken: string;
  readonly expiresAt: string;
  readonly refreshToken: string;
  readonly registrationType: string;
}

/**
 * Keys into the Storage; placed here to avoid repeating across services.
 * @type {StorageKeySet} object defining the keys shared across services.
 */

export const STORAGE_KEYS: StorageKeySet = {
  accessToken: 'access_token',
  expiresAt: 'expires_at',
  jwtToken: 'id_token',
  profile: 'profile',
  refreshToken: 'refresh_token',
  registrationType: 'registration_type',
};
