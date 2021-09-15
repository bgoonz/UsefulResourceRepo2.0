import { Observable } from "rxjs";
import * as A from "./actions";

export function mapOp$(op$, can$ = Observable.of(true)) {
  const operation$ = op$
    .startWith({})
    .combineLatest(can$)
    .map(([action, can]) => {
      if (!action.hasOwnProperty("status")) {
        return { can, inProgress: false, failed: false };
      }
      if (action.status == A.STATUS_REQUEST) {
        return { can, inProgress: true, failed: false };
      }

      if (action.status == A.STATUS_FAIL) {
        return { can, inProgress: false, failed: true, error: action.error };
      }

      return { can, inProgress: false, failed: false };
    })
    .publishReplay(1);

  operation$.connect();
  return operation$;
}
