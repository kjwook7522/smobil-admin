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
  isDriver?: boolean;
  isAdmin?: boolean;
}

interface DefaultAction {
  type: string;
  payload: boolean;
}

interface UserAction {
  type: string;
  user: User;
}
