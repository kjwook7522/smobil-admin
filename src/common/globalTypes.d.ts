type ProductionList = Array<Production>;

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
