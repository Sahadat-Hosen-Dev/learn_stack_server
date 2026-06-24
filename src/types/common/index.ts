export interface FieldError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  code: number;
  error: string;
  message?: string;
  data?: FieldError[];
}
