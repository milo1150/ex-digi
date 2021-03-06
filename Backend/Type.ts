export interface LoginBody {
  username: string;
  password: string;
}

export interface UserData2 {
  uid: string;
  data: udata;
}
interface udata {
  username: string;
  password: string | number;
  name?: string;
}

export interface UpdateProfile {
  uid: string;
  name: string;
}
