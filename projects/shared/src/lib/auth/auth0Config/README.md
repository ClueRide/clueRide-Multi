# Responsibility
- Report whether or not we've registered the device on which this 
module is running (basically so the caller can direct to the registration page).
- Upon request, perform a registration for one of two types (see below).
- Upon request, perform a logout to de-register a device -- forget its credentials.
- Upon request, perform a renewal of an expired Access Token. 

# Collaborations
- TokenService to wrap the retrieval of tokens we've picked up.
- RegStateService to verify that our access token is 

# Supported Registration Types
Two "Types" of registration are supported:
- "Social" relies on Google or Facebook trust relationships.
- "Passwordless" confirms possession of a device by sending a code to 
an email address and asking confirmation.


