interface Production {
  id: string;
  name: string;
  category: string;
  count: number;
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  isLogin: boolean;
  isDriver: boolean;
  isAdmin: boolean;
}

interface MyTrunk {
  uid: string;
  displayName: string;
  trunk: Array<any>;
}

interface DefaultAction {
  type: string;
  payload: boolean;
}

interface UserAction {
  type: string;
  user: User;
}
