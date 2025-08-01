export interface Role {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  balance: number;
  phone: string | null;
  orgName: string | null;
  orgInn: string | null;
  secretName: string;
  status: string;
  type: string | null;
  isActive: boolean;
  isRegGoogle: boolean | null;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  
}
