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

export interface Pagination {
  page: number;
  limit: number;
  next?: number;
  prev?: number;
  totalPage: number;
  totalItems: number;
}

export type Links = {
  self: string;
  [key: string]: string | undefined | null;
};

export type GetResponse<T = unknown, Y = unknown> = {
  data: T;
  meta?: Y;
  pagination?: Pagination;
  Links?: Links;
};

export type MutateResponse<T = unknown> = {
  code: number;
  message: string;
  data?: T;
  links: Links;
};
