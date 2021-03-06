import * as Types from '../actions/Form';
const initialState: Types.UserData = {
  uid: '',
  username: '',
  name: '',
};
const reducer = (state = initialState, action: any) => {
  switch (action) {
    default:
      return state;
  }
};
export default reducer;
