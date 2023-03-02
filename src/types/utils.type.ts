export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data: Data
}

//Cú pháp `-?` sẽ loại undefiend của key optional
export type NoUndefinedField<T> = {
  [p in keyof T]-?: NoUndefinedField<NonNullable<T[p]>>
}
