# Responsibilities
Presents the profile of a Member/User when it is available post Authentication.
- Email address which is used as the Principal.
- Image of user when available ().
- Observable/Subject for confirmation that user wants to use the 
email address currently recorded for the access token.

# Collaborations
Profile Service works with:
- Back-end REST API to retrieve current session's Member record.
- Clients requesting Email Address or the URL of the user's image.
- Clients requesting the Member ID of logged in user.
- Confirmation Page informs the profile of confirmation status and notifies listeners of this event.
