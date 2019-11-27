# Responsibilities
Token Service knows about the JWT token that supports the
AuthService:
- Accepting a Token after authentication to indicate registering 
the device.
- Storage between sessions and retrieval when starting new session.
- Knows when the Token is expired.
- Clearing the storage to indicate de-registering the device.
  - User can request to de-register
  - Application can clear the token if it finds the token to 
  be invalid.
- For Behaviour Driven Development (end-to-end) tests, this service
will place a valid test token into storage.

# Collaborations
Token Services works with:
- AuthService which provides valid tokens and inquires whether a 
new token would be needed:
  - Token not available (un-registered device)
  - Token expired
- ProfileService receives the updated user details from the token
- localStorage to persist the token.
- Cordova Native Secure Storage for keeping the sensitive data.

Note that clients of this module would ask the AuthService if
the session has been registered and ask the AuthService to de-register
(logout).
