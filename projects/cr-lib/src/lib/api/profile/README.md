# Responsibilities - Member Profile
The Lifecycle: creation from JWT, persistence to back-end, availability to client.
- From JWT: uses the Token service to decode into a JSON object that is 
mapped to our Member object.
- From back-end: uses `member/active` endpoint to obtain a profile whose session has
already been established via Auth services. This instance is cached.
- Provides convenience functions to retrieve attributes of the Profile:
  - Email
  - Name
  - Image URL
  - Member ID
  - BadgeOS ID
- To persist to the back-end:
  - responds to Confirm event; new user has decided upon the email address to use.
  - Invokes the AccessState service to setup new accounts on the back-end.
  - Returns an observable so the client receives positive confirmation the accounts
  have been successfully created.
