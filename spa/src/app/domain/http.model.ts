export interface HttpBody<T> {
  success: boolean;
  message: string;
  data: T;
}
