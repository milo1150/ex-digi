export interface UserData {
  uid: string;
  username: string;
  name: string;
}

/**
|--------------------------------------------------
| ActionType
|--------------------------------------------------
*/
export type ActionType =
  | { type: 'UPDATE_INFO'; payload: UserData }
  | { type: 'CLEAR' };
