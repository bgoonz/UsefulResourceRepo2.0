import * as A from "../actions";
import _ from "lodash";
import { Observable, BehaviorSubject } from "rxjs";

const defaultView = {
  sets: [
    { id: "1ed", name: "1st Edition" },
    { id: "2ed", name: "2nd Edition" },
    { id: "3ed", name: "3rd Edition" },
    { id: "belgsh", name: "stuff and things" },
  ],
};

export default class AppStore {
  constructor({ dispatcher }) {
    this.view$ = new BehaviorSubject(defaultView);

    this.dialogs$ = dispatcher
      .on$(A.DIALOG_SET)
      .scan((stack, action) => {
        _.remove(stack, { id: action.id });
        debugger;
        if (action.isOpen) {
          stack.push({ id: action.id, props: action.props });
        }

        return stack;
      }, [])
      .startWith([])
      .publishReplay(1);

    this.dialogs$.connect();

    this.connection$ = new BehaviorSubject(A.CONNECTION_CONNECTED);
    this.reconnected$ = Observable.empty();
  }
}
