import IUser from "../types/user.type";

export const getLocalRefreshToken : () => string | undefined = () => {
    const userStr = localStorage.getItem("user");
    let user: IUser | undefined;
    
    if (userStr)
        user = JSON.parse(userStr);
    
    return user?.refreshToken ?? undefined;
}
  
export const getLocalAccessToken : () => string | undefined = () =>  {
    const userStr = localStorage.getItem("user");
    let user: IUser | undefined;
    
    if (userStr)
        user = JSON.parse(userStr);
    
    return user?.token ?? undefined;
}
  
export const updateLocalAccessToken = (token : string) =>  {
    const userStr = localStorage.getItem("user");
    let user: IUser | undefined;
    
    if (userStr)
        user = JSON.parse(userStr);
    
    if(user)
    {
        user.token = token
    }
    localStorage.setItem("user", JSON.stringify(user));
}
  
export const getUser : () => IUser | undefined = () =>  {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
  
    return null;
}

export const setUser = (user: IUser | undefined) =>  {
    localStorage.setItem("user", JSON.stringify(user));
}

export const removeUser = () =>  {
    localStorage.removeItem("user");
}
  
  