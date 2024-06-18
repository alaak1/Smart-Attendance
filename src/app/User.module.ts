export interface IUserCredentials {
  id: string;
  name?: string;
  email?: string;
  password: string;
  role?: string;
}

export interface IUser {
  id: string;
  email: string;
  password:string;
  name:string;
  role:"student"|"lecturer";
}
