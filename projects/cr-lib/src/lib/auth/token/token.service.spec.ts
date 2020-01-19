/**
 * Created by jett on 1/20/18.
 */
import {REGISTRATION_TYPE} from '../registration-type';
import {STORAGE_KEYS} from '../storage-keys';
import {BddMockToken} from './bddMockToken';
import {TokenService} from './token.service';

let toTest: TokenService;
const bddMockToken: BddMockToken = new BddMockToken();

describe('Services: TokenService', () => {

  beforeEach(() => {

    toTest = new TokenService();
    window.localStorage.clear();
  });

  it('should be defined', () => {
    expect(toTest).toBeDefined();
  });

  describe('bddRegister', () => {

    it('should place valid access token into storage', () => {
      /* make call */
      toTest.bddRegister();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toContain(bddMockToken.accessToken);
    });

  });

  describe('decodePayload', () => {
    it('should throw exception for null token', () => {
      expect(toTest.decodePayload.bind(null, null)).toThrowError('passed token is not populated');
    });

    it('should throw exception for empty token', () => {
      expect(toTest.decodePayload.bind(null, '')).toThrowError('passed token is not populated');
    });

    it('should throw exception for malformed token', () => {
      expect(toTest.decodePayload.bind(null, 'part1.part2')).toThrowError('JWT must have 3 parts');
    });

    it('should throw exception for inability to parse payload portion of token', () => {
      expect(toTest.decodePayload.bind(null, 'part1..part3')).toThrowError();
    });

  });

  describe('hasAccessToken', () => {

    it('should be false when not populated', () => {
      /* setup data */
      toTest.clearToken();

      /* make call */
      /* verify results */
      expect(toTest.hasAccessToken()).toBeFalsy();
    });

    it('should should be true when populated', () => {
      /* setup data */
      toTest.setAccessToken('Test Token');

      /* train mocks */

      /* make call */
      /* verify results */
      expect(toTest.hasAccessToken()).toBeTruthy();

    });

  });

  describe('setAccessToken', () => {
      it('should place the access token into storage', () => {
        /* make call */
        toTest.setAccessToken(bddMockToken.accessToken);

        /* verify results */
        expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toContain(bddMockToken.accessToken);
        expect(toTest.hasAccessToken()).toBeTruthy();
      });
  });

  describe('setRegistrationType', () => {

    it('should record the given registration type', () => {
      /* make call */
      toTest.setRegistrationType(REGISTRATION_TYPE.SOCIAL);

      /* verify results */
      window.localStorage.getItem(STORAGE_KEYS.registrationType);
    });

  });

  describe('getRegistrationType', () => {

    it('should retrieve the correct value', () => {
      /* setup data */
      const expected: string = REGISTRATION_TYPE.SOCIAL;
      toTest.setRegistrationType(expected);

      /* make call */
      const actual = toTest.getRegistrationType();

      /* verify results */
      expect(actual).toEqual(expected);
    });

  });

  describe('clear', () => {

    it('should remove any stored values', () => {
      /* setup data */
      toTest.bddRegister();

      /* make call */
      toTest.clearToken();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.jwtToken)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.profile)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.expiresAt)).toBeNull();
    });

  });

});
