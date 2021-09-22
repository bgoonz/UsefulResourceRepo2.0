export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export function setActiveTab(activeId) {
  return {
    type: SET_ACTIVE_TAB,
    payload: activeId,
  };
}
