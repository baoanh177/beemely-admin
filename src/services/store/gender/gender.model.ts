export interface IGender {
  id?: string;
  name: string;
  slug: string;
  imageUrl: string;
  path: string;
  productCount: number;
}

export interface IGenderResponse {
  message: string;
  statusCode: number;
  metaData: IGender[];
}
