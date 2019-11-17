/**
 * Holds details for the Registration States.
 *
 * The Key is what clients care about for steering action.
 * The Source helps diagnostics by giving the reason a state
 * is chosen.
 *
 * I may not be propagating Exception events (preferring to handle
 * them directly without client involvement), but the `exception` field
 * is a reminder that this remains under consideration.
 */
import {RegStateKey} from './reg-state-key';

export class RegState {

  constructor(
    readonly state: RegStateKey,
    readonly source: string,
    readonly exception?: boolean,
  ) {}

}
