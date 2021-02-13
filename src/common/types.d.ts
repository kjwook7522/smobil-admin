interface Production {
  id: string;
  name: string;
  category: string;
  count: number;
}

interface DefaultAction {
  type: string;
  payload: boolean;
}

interface UserAction {
  type: string;
  payload: User;
}