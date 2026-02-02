export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>; // Allow undefined
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}
