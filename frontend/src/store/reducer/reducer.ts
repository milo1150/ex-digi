import * as Types from '../actions/Form';
const initialState: Types.UserData = {
  uid: '',
  username: '',
  name: '',
};
const reducer = (
  state: Types.UserData = initialState,
  action: Types.ActionType
): Types.UserData => {
  switch (action.type) {
    case 'UPDATE_INFO':
      // console.log('UPDATE_INFO', action.payload);
      return action.payload;
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
};
export default reducer;
