/**
 * Created by jett on 1/8/18.
 */

export class BddMockToken {
  /* This string should match the configured value for clueride.test.token. */
  accessToken = 'Change this to your secret test token';
  profile: any = {
    given_name: 'Bike',
    family_name: 'Angel',
    name: 'Bike Angel',
    picture: 'https://lh6.googleusercontent.com/-sbXJYcO2EBY/AAAAAAAAAAI/AAAAAAAAAAc/86jPiXVs-ZE/photo.jpg',
    email: 'bikeangel.atl@gmail.com',
    email_verified: true,
    iss: 'https://clueride-social.auth0.com/ ',
    sub: 'google-oauth2|115646561365354495360',
    aud: 'ZztcBTDcglTr10lyuLoq8Zy57EW4HXTZ',
    iat: 1516759671,
    exp: 2117623671
  };
}
