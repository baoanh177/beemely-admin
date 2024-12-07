export interface IBrand {
  id?: string;
  name: string;
  image: string;
  description?: string;
  productCount: number;
}
export interface IBrandResponse {
  message: string;
  statusCode: number;
  metaData: IBrand[];
}
