export default interface IUser {
    id?: any | null,
    username: string,
    email: string,
    firstName: string, 
    lastName: string,
    token?: string | null,
    type?: string | null,
    password: string,
    refreshToken? : string | null
  }