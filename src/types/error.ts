export interface Error {
  field: string;
  message: string;
}

export interface ErrorResponse {
  success: false;
  data: Error[] | string;
}
