export interface SuccessResponse{
}

export interface ErrorResponse{
    message : string
}

export function IsError(response : ErrorResponse | SuccessResponse | undefined) : response is ErrorResponse {
    return (response as ErrorResponse).message !== undefined;
}
