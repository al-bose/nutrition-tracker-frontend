export interface SignUpRequest{
    firstName : string, 
    lastName: string, 
    email: string, 
    username: string, 
    password: string
}

export interface LoginRequest{
    username: string, 
    password: string
}