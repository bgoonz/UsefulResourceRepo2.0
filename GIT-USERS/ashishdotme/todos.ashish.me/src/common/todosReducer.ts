export interface State {
    currentMenu: string;
}

export interface Actions {
    type: string;
    payload: any;
}

export default function reducer(state: State, action: Actions) {
    switch (action.type) {
        case 'CHANGE_CURRENT_MENU':
            return {
                currentMenu: action.payload,
            };
        default:
            return state;
    }
}
