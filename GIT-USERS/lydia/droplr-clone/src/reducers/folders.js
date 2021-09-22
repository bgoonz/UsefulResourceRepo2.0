export const folderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FOLDERS':
      return state = action.payload || false

    default: 
      return state;
  }
}