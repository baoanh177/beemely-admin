export interface IGender {
  id?: string;
  name: string;
  slug: string;
}

export interface IGenderResponse {
  message: string;
  statusCode: number;
  metaData: IGender[];
}
