/**
 * Created by jett on 12/24/18.
 */

/**
 * Formalizes the various states of the application for steering the
 * page presentation and other logic.
 */
export enum AppState {

  UNREGISTERED,     // This device needs to be registered
  READY_TO_PLAY,    // We have accepted an invitation for an outing
  INVITED,          // There is an outstanding invitation
  NO_INVITES,       // No current invites or outings
  EXCEPTION         // Exception has occurred such that we can't tell what state we should be in

}
